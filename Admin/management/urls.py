from django.urls import path
from .views import ServiceListCreateView, ServiceRetrieveUpdateDestroyView
from .import views

urlpatterns = [
    path('services/', ServiceListCreateView.as_view(), name='service-list-create'),
    path('services/<int:pk>/', ServiceRetrieveUpdateDestroyView.as_view(), name='service-detail'),
 
    path('brands/', views.BrandListCreateView.as_view(), name='brand-list-create'),
    path('brands/<int:pk>/', views.BrandRetrieveUpdateDestroyView.as_view(), name='brand-retrieve-update-destroy'),
    path('vehicles/', views.VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('vehicles/<int:pk>/', views.VehicleRetrieveUpdateDestroyView.as_view(), name='vehicle-retrieve-update-destroy'),
    path('brand-list/',views.BrandListView.as_view(), name='brand-list'),
    path('brand-name/',views.BrandnameView.as_view(), name='brand-name'),
    path('vehiclesname/', views.VehiclenameView.as_view(), name='vehiclename'),
    path('vehiclesdetails/<int:pk>/', views.VehicleDetailsView.as_view(), name='vehicle-details'),
    path('get_details/', views.VehiclenameServiceView.as_view(), name='get_details'),
   
]