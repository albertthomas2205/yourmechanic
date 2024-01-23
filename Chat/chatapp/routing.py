from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from.consumers import ChatConsumer  # Import your ChatConsumer
from .views import RoomMessagesAPIView  # Import your DRF view

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            path('ws/<str:room_name>/', ChatConsumer.as_asgi()),  # WebSocket routing for Channels

            # DRF API endpoint for retrieving and creating messages
            path('api/room/<str:room_name>/', RoomMessagesAPIView.as_view(), name='room-messages-api'),
        )
    ),
    # Add other protocol routers as needed.
})
