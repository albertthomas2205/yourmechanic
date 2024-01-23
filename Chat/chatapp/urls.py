from django.urls import path, include
from .views import RoomMessagesAPIView

urlpatterns = [
    # Existing WebSocket URL patterns for Channels
    # ...

    # DRF API endpoint
    path('room/<str:room_name>/', RoomMessagesAPIView.as_view(), name='room-messages-api'),
    # Add other URLs as needed.
]