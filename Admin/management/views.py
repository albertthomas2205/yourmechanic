from django.shortcuts import render
from django.db import IntegrityError
# Create your views here.
from rest_framework import generics
from rest_framework.generics import ListAPIView
from .models import Service,Brand,Vehicle
from .serializers import ServiceSerializer
from .serializers import ServiceSerializer,VehicleSerializer,BrandSerializer,BrndnameSerializer,VehiclenameSerializer,VehicleSerializerr
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView
from rest_framework import permissions

from rest_framework.pagination import PageNumberPagination

# class CustomPageNumberPagination(PageNumberPagination):
#     page_size = 4
#     page_size_query_param = 'page_size'
#     max_page_size = 100

class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            print("haiiiii")
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except IntegrityError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ServiceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
class BrandListCreateView(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class VehicleListCreateView(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class VehicleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
# If you need views for individual instances:
class BrandDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class VehicleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehiclenameSerializer
    
    
class BrandListView(ListAPIView):
    queryset = Brand.objects.all().prefetch_related('vehicle_set')
    serializer_class = BrandSerializer
class BrandnameView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrndnameSerializer
    

class VehiclenameView(APIView):
    
    def post(self, request):
        print("haiiiiii")
        brand_id =request.data["brand_id"]
        print(brand_id)
        try:
            # Retrieve the Brand object based on brand_id
            # brand = get_object_or_404(Brand, id=brand_id)
            
            # Retrieve vehicles related to the brand
            vehicles = Vehicle.objects.filter(brand_id=brand_id)
         
            
            # Serialize only the 'vehicle_name' field from the vehicles
            serialized_vehicles = VehicleSerializer(vehicles, many=True, read_only=True).data

            # Return a response with the serialized vehicle_name data
            return Response(data=serialized_vehicles ,status=status.HTTP_200_OK)
        
        except Exception as e:
            # Handle other exceptions if necessary
            return Response({'message': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class VehicleDetailsView(RetrieveAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializerr
    permission_classes = [permissions.AllowAny]
    
    
class VehiclenameServiceView(APIView):
    def post(self, request):
        vehicle_id = request.data.get('vehicle_id')
        service_id = request.data.get('service_id')

        try:
            # Fetch service details based on service_id
            service = Service.objects.get(id=service_id)
            service_serializer = ServiceSerializer(service)

            # Fetch vehicle details based on vehicle_id
            vehicle = Vehicle.objects.get(id=vehicle_id)
            vehicle_serializer = VehicleSerializer(vehicle)

            response_data = {
                'service_details': service_serializer.data,
                'vehicle_details': vehicle_serializer.data,
            }

            return Response(response_data, status=200)

        except Service.DoesNotExist:
            return Response({'error': 'Service not found'}, status=404)

        except Vehicle.DoesNotExist:
            return Response({'error': 'Vehicle not found'}, status=404)

        except Exception as e:
            return Response({'error': str(e)}, status=500)