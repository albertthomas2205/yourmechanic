from rest_framework import serializers
from .models import Bookings

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = '__all__'
        
        
class CheckAvilabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = ('date_time', 'mechanic_id')