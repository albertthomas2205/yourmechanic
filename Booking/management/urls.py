from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
 path('bookings/', views.BookingListCreateView.as_view(), name='booking-list-create'),
 path('check-availability/', views.CheckAvailabilityView.as_view(), name='check-availability'),
]