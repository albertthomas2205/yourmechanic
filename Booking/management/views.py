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

    def post(self, request, *args, **kwargs):
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
        return Bookings.objects.filter(user_id=user_id)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Bookings.DoesNotExist:
            return Response({'error': 'Bookings not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)