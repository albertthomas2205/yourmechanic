from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import   CustomUser,CustomUserManager,UserVehicles
from .serializers import UserRegisterSerializer,MyTokenObtainPairSerializer, BlockUserSerializer,UserlistSerializer, OtpRequestSerializer,OtpResponseSerializer,UsergoogleSerializer,MechanicRegisterSerializer,EmailCheckSerializer
from .serializers import AdminRegisterSerializer,MechanicProfiledetailsSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import api_view
from .serializers import UserProfileEditSerializer

from rest_framework.exceptions import AuthenticationFailed,ParseError
from django.contrib.auth import authenticate

from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter

from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.generics import ListAPIView
from .models import CustomUser
from .serializers import CustomUserSerializer,VerifyMechanicSerializer



class RegisterVieww(APIView):
    
    def post(self,request):
        print("haiiiiiii")
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE,)  
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        
        content ={'Message':'User Registered Successfully'}
        return Response(content,status=status.HTTP_201_CREATED,)
    
class AdminRegisterVieww(APIView):
    
    def post(self,request):
        
        serializer = AdminRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE,)  
    
        content ={'Message':'User Registered Successfully'}
        return Response(content,status=status.HTTP_201_CREATED,)
    
class RegisterView(APIView):
    
    def post(self, request):
        email = request.data.get('email', None)

        # Check if a user with the provided email exists
        user = CustomUser.objects.filter(email=email).first()

        if user:
            # If the user exists, check if they are already a mechanic
            if user.is_user:
                return Response({'error': 'Email already associated with a user'}, status=status.HTTP_400_BAD_REQUEST)
            
            # If not a mechanic, update is_mechanic to True
            user.is_user = True
            user.is_useractive = True
            user.save()
        else:
            # If the user doesn't exist, create a new mechanic user
            serializer = UserRegisterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

        content = {'Message': 'User Registered Successfully'}
        return Response(content, status=status.HTTP_201_CREATED)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MechanicRegisterSerializer
from .models import CustomUser

class MechanicRegisterView(APIView):
    
    def post(self, request):
        email = request.data.get('email', None)

        # Check if a user with the provided email exists
        user = CustomUser.objects.filter(email=email).first()

        if user:
            # If the user exists, check if they are already a mechanic
            if user.is_mechanic:
                return Response({'error': 'Email already associated with a mechanic'}, status=status.HTTP_400_BAD_REQUEST)
            
            # If not a mechanic, update is_mechanic to True
            user.is_mechanic = True
            user.is_mechanicactive = True
            user.save()
        else:
            # If the user doesn't exist, create a new mechanic user
            serializer = MechanicRegisterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

        content = {'Message': 'User Registered Successfully'}
        return Response(content, status=status.HTTP_201_CREATED)

    
class GoogleLoginAndRegisterView(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            first_name = request.data.get('first_name', '')
            password = request.data.get("password")
            # Check if the user with the given email already exists
            user = CustomUser.objects.filter(email=email).first()
            print(user)

            if user is None:
                # If user does not exist, create a new user
                serializer = UserRegisterSerializer(data={'email': email,'first_name':first_name,'password':password})
                if serializer.is_valid():
                    serializer.save()
                    user = serializer.instance
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # You might want to add additional logic for handling Google authentication

            # Perform authentication with the user

            if user is None:
                raise AuthenticationFailed('Unable to authenticate user')

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            refresh["first_name"] = str(user.first_name)

            # Prepare response data
            content = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'first_name': str(user.first_name),
                # 'isadmin': user.is_superuser,
            }

            return Response(content, status=status.HTTP_200_OK)

        except KeyError:
            raise ParseError('All Fields Are Required')
    


class LoginView(APIView):
    def post(self,request):
        try:
            email = request.data['email']
            password =request.data['password']
        
        except KeyError:
            raise ParseError('All Fields Are Required')
        
        if not CustomUser.objects.filter(email=email).exists():
            raise AuthenticationFailed('Invalid Email Address')
        
        
        print(email,password)
        user = authenticate(username=email,password=password)
        if user is None:
            raise AuthenticationFailed('Invalid Password')
    
        if not user.is_useractive:
            raise AuthenticationFailed('No permission to access')
            
        
        
        refresh = RefreshToken.for_user(user)
        refresh["first_name"] = str(user.first_name)
       
        content = {
                     'refresh': str(refresh),
                     'access': str(refresh.access_token),
                     'first_name':str(user.first_name),
                     'id':str(user.id),
                     'is_user':user.is_user,
                     'is_admin':user.is_admin,
                     
                     
                }
        
        return Response(content,status=status.HTTP_200_OK)
    
    
    
    
class LoginAdminView(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
        except KeyError:
            raise ParseError('All Fields Are Required')

        user = authenticate(username=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid Email Address or Password')

        if user.is_admin:
            refresh = RefreshToken.for_user(user)
            refresh['first_name'] = str(user.first_name)

            content = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'first_name': str(user.first_name),
                'is_admin': user.is_admin,
            }

            return Response(content, status=status.HTTP_200_OK)

        raise AuthenticationFailed('User is not a Admin')
    
class LoginMechanicView(APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
        except KeyError:
            raise ParseError('All Fields Are Required')

        user = authenticate(username=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid Email Address or Password')


        if not user.is_mechanicactive:
            raise AuthenticationFailed('No permission to access')

        refresh = RefreshToken.for_user(user)
        refresh['first_name'] = str(user.first_name)

        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'id': str(user.id),
            'first_name': str(user.first_name),
            'is_mechanic': user.is_mechanic,
        }

        return Response(content, status=status.HTTP_200_OK)

class EmailCheckView(APIView):
    def post(self, request):
        serializer = EmailCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        user_exists = CustomUser.objects.filter(email=email).exists()
        if user_exists:
            user = CustomUser.objects.filter(email=email).first()
        
            
            if user.is_mechanic:
                print("hellow")
                
            

            # Returning a response based on whether the user with the provided email exists
        
                return Response({"detail": "Email already exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        return Response({"detail": "Email is available"}, status=status.HTTP_200_OK)

class EmailCheckUserView(APIView):
    def post(self, request):
        serializer = EmailCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        user_exists = CustomUser.objects.filter(email=email).exists()
        if user_exists:
            
            user = CustomUser.objects.filter(email=email).first()
            print(user.first_name)
        
        
            
            if user.is_user:
                print("hellow")
                
            

            # Returning a response based on whether the user with the provided email exists
        
                return Response({"detail": "Email already exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
      
        return Response({"detail": "Email is available"}, status=status.HTTP_200_OK)
class OtpRequestView(APIView):
    def post(self, request, *args, **kwargs):
        print("emil ethiyadaa")
        serializer = OtpRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
          
            print("haiiiiiii")
            custom_user_manager = CustomUserManager()
            content = custom_user_manager.send_otp_email(request, email)
            if content is not None:
                otp = {"otp":content}
                return Response(otp, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'An error occurred while sending the OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def block_user(request):
    serializer = BlockUserSerializer(data=request.data)
    
    if serializer.is_valid():
        user_id = serializer.validated_data['user_id']
        
        try:
            user = CustomUser.objects.get(id=user_id)
            # Toggle the is_active status
            user.is_useractive = not user.is_useractive
            user.save()
            
            action = 'unblocked' if user.is_useractive else 'blocked'
            return Response({'detail': f'User {action} successfully'}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def block_mechanic(request):
    serializer = BlockUserSerializer(data=request.data)
    
    if serializer.is_valid():
        user_id = serializer.validated_data['user_id']
        
        try:
            user = CustomUser.objects.get(id=user_id)
            # Toggle the is_active status
            user.is_mechanicactive = not user.is_mechanicactive
            user.save()
            
            action = 'unblocked' if user.is_mechanicactive else 'blocked'
            return Response({'detail': f'Mechanic {action} successfully'}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'Mechanic not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomUserListView(ListAPIView):
    queryset = CustomUser.objects.filter(is_user=True)
    serializer_class = CustomUserSerializer
    



class MechanicListView(ListAPIView):
    queryset = CustomUser.objects.filter(is_mechanic=True)
    serializer_class = CustomUserSerializer
    


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.shortcuts import get_object_or_404

class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileDetailView(APIView):

    def get(self, request, user_id):
        profile = get_object_or_404(UserProfile, user_id=user_id)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def patch(self, request, user_id):
        profile = get_object_or_404(UserProfile, user_id=user_id)
        new_username = request.data.get('username', '')

        # Check if the new username already exists
        existing_profile = UserProfile.objects.exclude(pk=profile.pk).filter(username=new_username).exists()
        if existing_profile:
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        
        serializer = UserProfileEditSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id):
        profile = get_object_or_404(UserProfile, user_id=user_id)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

from .serializers import UserVehiclesSerializer

class UserVehiclesListCreateView(generics.ListCreateAPIView):
    

    queryset = UserVehicles.objects.all()
    serializer_class = UserVehiclesSerializer
    
    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
from .serializers import MechanicProfileSerializer
from .models import MechanicProfiledetails,MechanicProfile
from rest_framework.exceptions import ValidationError


class MechanicProfileListCreateView(generics.ListCreateAPIView):
    print("haiiiii")
    queryset = MechanicProfiledetails.objects.all()
    serializer_class = MechanicProfileSerializer
  
  
# class MechanicProfileRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = MechanicProfile.objects.all()
#     serializer_class = MechanicProfileSerializer
    
class UserVehiclesListAPIView(generics.ListAPIView):
    serializer_class = UserVehiclesSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')  # Assuming the user_id is provided in the URL
        return UserVehicles.objects.filter(user_id=user_id)
class UserVehiclesRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserVehiclesSerializer
    lookup_field = 'pk' 

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')  # Assuming the user_id is provided in the URL
        return UserVehicles.objects.filter(user_id=user_id)
    
# class MechanicProfileDetailView(APIView):

#     def get(self, request, mechanic_id):
#         profile = get_object_or_404(MechanicProfiledetails, mechanic_id=mechanic_id)
#         serializer = MechanicProfileSerializer(profile)
#         return Response(serializer.data)

#     def put(self, request, mechanic_id):
#         profile = get_object_or_404(MechanicProfiledetails, mechanic_id=mechanic_id)
#         serializer =MechanicProfileSerializer(profile, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MechanicProfileDetailView(APIView):
    def get(self, request, mechanic_id):
        profile = get_object_or_404(MechanicProfiledetails, mechanic_id=mechanic_id)
        serializer = MechanicProfileSerializer(profile)
        return Response(serializer.data)

    def patch(self, request, mechanic_id):
        profile = get_object_or_404(MechanicProfiledetails, mechanic_id=mechanic_id)
        serializer = MechanicProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, user_id):
    #     profile = get_object_or_404(MechanicProfiledetails, user_id=user_id)
    #     profile.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET', 'PATCH'])
def mechanic_profile_detail(request, mechanic_id):
    profile = get_object_or_404(MechanicProfiledetails, mechanic_id=mechanic_id)

    if request.method == 'GET':
        serializer = MechanicProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = MechanicProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def verify_mechanic(request):
    serializer = VerifyMechanicSerializer(data=request.data)
    
    if serializer.is_valid():
        mechanic_id = serializer.validated_data['mechanic_id']
        
        try:
            user = MechanicProfiledetails.objects.get(mechanic_id=mechanic_id)
            mechanic = CustomUser.objects.get(id=mechanic_id)
            mechanic.is_verify = not mechanic.is_verify
            user.is_verify = not user.is_verify
            user.save()
            mechanic.save()
            
            action = 'verifyed' if user.is_verify else 'not verified'
            return Response({'detail': f'User {action} successfully'}, status=status.HTTP_200_OK)
        except MechanicProfiledetails.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyView(ListAPIView):
    queryset = CustomUser.objects.filter(is_verify=True)
    serializer_class = CustomUserSerializer


from .models import Booking
from .serializers import BookingSerializer

from datetime import timedelta
class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #     # data['service_time'] = timedelta(hours=1)  # Set default service_time to 1 hour
    #     serializer = self.get_serializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=201, headers=headers)
    
from rest_framework.response import Response
from django.utils import timezone


class IsMechanicAvailableView(generics.CreateAPIView):
    serializer_class = BookingSerializer

    def post(self, request, *args, **kwargs):
        mechanic_id = request.data.get('mechanic_id')
        requested_datetime = request.data.get('requested_datetime')
        service_duration = request.data.get('service_duration')

        end_datetime = timezone.datetime.strptime(requested_datetime, '%Y-%m-%dT%H:%M:%S') + timezone.timedelta(minutes=int(service_duration))

        existing_bookings = Booking.objects.filter(
            mechanic_id=mechanic_id,
            booking_date_time__lt=end_datetime,
            booking_date_time__gte=requested_datetime,
        )

        return Response({'available': not existing_bookings.exists()})

# class MechanicProfiledetailsUpdateView(generics.UpdateAPIView):
#     queryset = MechanicProfiledetails.objects.all()
#     serializer_class = MechanicProfiledetailsSerializer

#     def post(self, request, *args, **kwargs):
        
#         return self.update(request, *args, **kwargs)

#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=partial)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#         return Response(serializer.data)
    
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import UserVehicles
from .serializers import UserVehiclesSerializer

@api_view(['GET', 'PATCH', 'DELETE'])
def user_vehicles_detail(request, pk):
    try:
        user_vehicle = UserVehicles.objects.get(pk=pk)
    except UserVehicles.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserVehiclesSerializer(user_vehicle)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = UserVehiclesSerializer(user_vehicle, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user_vehicle.delete()
        return Response({'detail': 'User vehicle deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)



class UserAndVehicleDetailsAPIView(APIView):
    def post(self, request):
        mechanic_id = request.data.get('mechanic_id')
        vehicle_id = request.data.get('vehicle_id')
        try:
            # Fetch first_name from CustomUser based on mechanic_id
            mechanic_user = CustomUser.objects.get(id=mechanic_id)
            mechanic_serializer = CustomUserSerializer(mechanic_user)

            # Fetch vehicle details from UserVehicle based on vehicle_id
            vehicle = UserVehicles.objects.get(id=vehicle_id)
            vehicle_serializer = UserVehiclesSerializer(vehicle)

            response_data = {
                'mechanic_name': mechanic_serializer.data.get('first_name'),
                'vehicle_id': vehicle_serializer.data,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({'error': 'Mechanic not found'}, status=status.HTTP_404_NOT_FOUND)

        except UserVehicles.DoesNotExist:
            return Response({'error': 'Vehicle not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

