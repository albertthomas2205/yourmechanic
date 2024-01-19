from django.shortcuts import render
from rest_framework import serializers
from rest_framework.generics import ListAPIView
# Create your views here.
from rest_framework import generics
from rest_framework.response import Response
from .models import Bookings
from .serializers import BookingSerializer,CheckAvilabilitySerializer
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Bookings.objects.all()
    serializer_class = BookingSerializer

    def perform_create(self, serializer):
        # Extract data from the request
        mechanic_id = self.request.data.get('mechanic_id')
        date_time = self.request.data.get('date_time')

        # Check if a booking with the same mechanic_id, date, and time already exists
        existing_booking = Bookings.objects.filter(
            mechanic_id=mechanic_id,
            date_time=date_time
        ).exists()

        if existing_booking:
            raise serializers.ValidationError("The time slot is already booked for this mechanic.")

        # If not, proceed with the creation of the booking
        serializer.save()

        # Get the booking ID after saving
        booking_id = serializer.instance.id
     

        # Customize the response with status code and booking ID
        return Response({
            'status': status.HTTP_201_CREATED,
            'message': 'Booking created successfully.',
            'booking_id': booking_id,
        }, status=status.HTTP_201_CREATED)
        
class CheckAvailabilityView(generics.GenericAPIView):
    serializer_class = CheckAvilabilitySerializer

    def post(self, request):
        mechanic_id = request.data.get('mechanic_id')
        date_time = request.data.get('date_time')
        print(date_time)

        # Check if a booking with the same mechanic_id, date, and time already exists
        existing_booking = Bookings.objects.filter(
            mechanic_id=mechanic_id,
            date_time=date_time
        ).exists()

        if existing_booking:
            return Response({"detail": "The time slot is already booked for this mechanic."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "The time slot is available."}, status=status.HTTP_200_OK)
        
        
    
from .serializers import BookingSerializer   
class BookingsByUserListView(ListAPIView):
    serializer_class = BookingSerializer


    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Bookings.objects.filter(user_id=user_id).order_by( '-id')

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Bookings.DoesNotExist:
            return Response({'error': 'Bookings not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BookingsByMechanicListView(ListAPIView):
    serializer_class = BookingSerializer


    def get_queryset(self):
        mechanic_id = self.kwargs['mechanic_id']
        return Bookings.objects.filter(mechanic_id=mechanic_id).order_by( '-id')

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Bookings.DoesNotExist:
            return Response({'error': 'Bookings not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
from django.http import Http404   
        
class UpdateBookingStatusAPIView(generics.views.APIView):

    def put(self, request):
        pk = request.data.get('pk')
        action = request.data.get('action')
        
        try:
            booking = Bookings.objects.get(id=pk)
        except Bookings.DoesNotExist:
            raise Http404("Booking does not exist")

        # Check if the action is a valid choice
        valid_actions = ['update_to_ongoing', 'update_to_completed', 'cancel_booking']
        if action not in valid_actions:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the status based on the action
        if action == 'update_to_ongoing':
            new_status = 'w'  # 'w' represents 'Ongoing'
        elif action == 'update_to_completed':
            new_status = 'c'  # 'c' represents 'Completed'
        elif action == 'cancel_booking':
            new_status = 'd'  # 'd' represents 'Canceled'

        # Update the status and save the model
        booking.status = new_status
        booking.save()

        serializer = BookingSerializer(booking)
        return Response(serializer.data)

    def handle_exception(self, exc):
        if isinstance(exc, Http404):
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
        return super().handle_exception(exc)