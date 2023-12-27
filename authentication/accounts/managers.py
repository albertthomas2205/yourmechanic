from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import random
from django.contrib.sessions.models import Session
from django.core.mail import send_mail 
class CustomUserManager(BaseUserManager):
    def create_user(self,first_name,phone_number,last_name, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(first_name=first_name,last_name=last_name,phone_number=phone_number,email=email,**extra_fields)
        extra_fields.setdefault('is_verified', False)
        user.set_password(password)
        user.save(using=self._db)
        return user
  
    def create_superuser(self, email, password=None, first_name=None, last_name=None, phone_number=None, **extra_fields):
        # Ensure that all required fields are provided
        if not email or not first_name or not last_name or not phone_number:
            raise ValueError("The email, first_name, last_name, and phone_number fields must be set")

        user = self.create_user(email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.first_name = first_name
        user.last_name = last_name
        user.phone_number = phone_number
        user.save(using=self._db)
        return user

    def send_otp_email(self,request,email):
        otp = str(random.randint(100000, 999999))  # Generate a random 6-digit OTP
        message = f'Your OTP for verification: {otp}'
        request.session['gmail']=email
        request.session['otp'] = otp
        request.session.save()
        
        send_mail(
            'OTP Verification',
            message,
            'shoerack2205@gmail.com',  # Sender's email address
            [email],  # Recipient's email address
            fail_silently=False,
        )

        return otp
        
 