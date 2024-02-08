from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
path('bookings/', views.BookingListCreateView.as_view(), name='booking-list-create'),
path('check-availability/', views.CheckAvailabilityView.as_view(), name='check-availability'),
path('bookinguser/<int:user_id>/', views.BookingsByUserListView.as_view(), name='bookings_by_user_list'),
path('bookingmechanic/<int:mechanic_id>/', views.BookingsByMechanicListView.as_view(), name='bookings_by_user_list'),
path('bookingongoing/', views.UpdateBookingStatusAPIView.as_view(), name='update-booking-to-ongoing'),
path('bookingcompleted/', views.UpdateBookingStatusAPIView.as_view(), name='update-booking-to-completed'),
path('bookingcanceld/', views.UpdateBookingStatusAPIView.as_view(), name='cancel-booking'),
path('bookings/<int:pk>/', views.BookingUpdateView.as_view(), name='booking-update'),
]