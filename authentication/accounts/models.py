from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import CustomUserManager
from django.utils import timezone

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser,BaseUserManager


# class MyAccountManager(BaseUserManager):
#     def create_user(self,first_name,email, phone_number,password=None):
#         if not email:
#             raise ValueError('User Must Have An Email Adress')
#         if not phone_number:
#             raise ValueError('User Must Have An Phone Number')
            
#         user = self.model(
#             email = self.normalize_email(email),
#             first_name = first_name,
#             phone_number = phone_number
#         )
#         user.set_password(password)
#         user.save(using=self._db)
        
#         return user
    
#     def create_superuser(self,first_name,email, phone_number,password):
#         user = self.create_user(email=self.normalize_email(email),
#                                 first_name=first_name,
#                                 phone_number=phone_number,
#                                 password=password,
#                                 )
#         user.is_active = True
#         user.is_superuser = True
#         user.is_email_verified = True
#         user.is_staff = True
        
#         user.save(using=self._db)
#         return user
            

class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150,null = True)
    password=models.CharField(max_length=250,null = True)
    phone_number = models.CharField(max_length=100,null = True)
    is_mechanic = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_mechanicactive = models.BooleanField(default=False)
    is_useractive = models.BooleanField(default=False)
    is_user = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default = False)
    is_admin = models.BooleanField(default = False)
    date_joined = models.DateTimeField(default=timezone.now)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    
    objects = CustomUserManager()
    
    def __str__(self):
        return self.first_name
class Mechanic(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150,null = True)
    password=models.CharField(max_length=250,null = True)
    phone_number = models.CharField(max_length=100,null = True)
    is_mechanic = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default = False)
    is_admin = models.BooleanField(default = False)
    date_joined = models.DateTimeField(default=timezone.now)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    
    objects = CustomUserManager()
    
    def __str__(self):
        return self.first_name
    

# class User(AbstractBaseUser):
#     first_name = models.CharField(max_length=50)
#     phone_number = models.CharField(max_length=12,unique=True)
#     email = models.EmailField(max_length=100,unique=True)
  
    
    
    
#     #required field
#     date_joined = models.DateTimeField(auto_now_add=True)
#     last_login = models.DateTimeField(auto_now_add=True)
#     is_superuser = models.BooleanField(default=False)
#     is_email_verified = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
    
#     USERNAME_FIELD  = 'email'
#     REQUIRED_FIELDS = ['phone_number','first_name']
    
#     objects = MyAccountManager()
    
#     def __str__(self):
#         return self.first_name
    
#     def has_perm(self,perm,obj=None):
#         return self.is_superuser
    
#     def has_module_perms(self,add_label):
#         return True
    