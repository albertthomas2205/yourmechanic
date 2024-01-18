from rest_framework import serializers
from .models import Bookings

class BookingSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    class Meta:
        
        model = Bookings
        
        fields = '__all__'
        
        
class CheckAvilabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = ('date_time', 'mechanic_id')