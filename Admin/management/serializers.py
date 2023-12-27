from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'time_required', 'image']

    # Add this method to handle image uploads
    def create(self, validated_data):
        return Service.objects.create(**validated_data)