from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer


from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken, Token,AccessToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(token)
        # Add custom claims
        token['first_name'] = user.first_name
        # ...
        
        return token
    
# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('password',)
        
class UsergoogleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'email']

    

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name','last_name','phone_number','email','password']
        extra_kwargs = {
            'password':{ 'write_only':True}
        }
    def create(self,validated_data):
        validated_data['is_user'] = True
        validated_data['is_useractive'] = True
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError({"password": "password is not valid"})
        

class AdminRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name','email','password']
        extra_kwargs = {
            'password':{ 'write_only':True}
        }
    def create(self,validated_data):
        validated_data['is_admin'] = True
        validated_data['is_useractive'] = True
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError({"password": "password is not valid"})
        
class MechanicRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['is_mechanic'] = True 
        validated_data['is_mechanicactive'] = True# Set is_mechanic to True by default
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance
        else:
            raise serializers.ValidationError({"password": "password is not valid"})
        
class EmailCheckSerializer(serializers.Serializer):
    email = serializers.EmailField()
      
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'  
        
class  OtpRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()
       
class OtpResponseSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
class UserlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__" 
        
class BlockUserSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    
    
class VerifyMechanicSerializer(serializers.Serializer):
    mechanic_id = serializers.IntegerField()
    
    
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'phone_number', 'place','profile_pic', 'pin', 'user']
class UserProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'phone_number', 'place', 'pin', 'user' ]
        
from .models import UserVehicles

class UserVehiclesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVehicles
        fields = '__all__'
from .models import MechanicProfiledetails
class MechanicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MechanicProfiledetails
        fields = ['place', 'pin', 'experience', 'description', 'profile_pic', 'mechanic_id',]
        # fields = '__all__'
class MechaniceditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MechanicProfiledetails
        fields = ['place', 'pin', 'experience', 'description', 'mechanic_id',]
       
      
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        

class MechanicProfiledetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MechanicProfiledetails
        fields = '__all__'

    def update(self, instance, validated_data):
        # Update only the fields that are provided in the request
        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance
        