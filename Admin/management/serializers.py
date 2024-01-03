from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'time_required', 'image']

    # Add this method to handle image uploads
    def create(self, validated_data):
        return Service.objects.create(**validated_data)
    
from .models import Brand, Vehicle



class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'brand_name', 'description']

class VehicleSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()

    class Meta:
        model = Vehicle
        fields = ['id', 'vehicle_name', 'description', 'brand', 'image']

class CreateVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'vehicle_name', 'description', 'brand', 'image']
        
class BrndnameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id','brand_name']
        
class VehiclenameSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Vehicle
        fields = ['id','vehicle_name','brand','image']
        
class VeicleidSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()




class VehicleSerializerr(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'
