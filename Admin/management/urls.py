from django.urls import path
from .views import ServiceListCreateView, ServiceRetrieveUpdateDestroyView
from .import views

urlpatterns = [
    path('services/', ServiceListCreateView.as_view(), name='service-list-create'),
    path('services/<int:pk>/', ServiceRetrieveUpdateDestroyView.as_view(), name='service-detail'),
 
    path('brands/<int:pk>/', views.BrandDetailAPIView.as_view(), name='brand-detail'),
    path('brands/', views.BrandListView.as_view(), name='brand-list'),
    path('vehicles/', views.VehicleListView.as_view(), name='vehicle-list'),
    path('vehicles/<int:pk>/', views.VehicleDetailAPIView.as_view(), name='vehicle-detail'),
    path('brand-list/',views.BrandListView.as_view(), name='brand-list'),
    path('brand-name/',views.BrandnameView.as_view(), name='brand-name'),
    path('vehiclesname/', views.VehiclenameView.as_view(), name='vehiclename'),
    path('vehiclesdetails/<int:pk>/', views.VehicleDetailsView.as_view(), name='vehicle-details'),
   
]