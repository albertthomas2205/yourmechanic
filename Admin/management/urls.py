from django.urls import path
from .views import ServiceListCreateView, ServiceRetrieveUpdateDestroyView

urlpatterns = [
    path('services/', ServiceListCreateView.as_view(), name='service-list-create'),
    path('services/<int:pk>/', ServiceRetrieveUpdateDestroyView.as_view(), name='service-detail'),
]