import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
# from . import routing
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Chat.settings")

get_asgi = get_asgi_application()

from Chatapp.consumers import ChatConsumer
from django.urls import re_path



application = ProtocolTypeRouter({
    'http': get_asgi,
    'websocket': AuthMiddlewareStack(
        URLRouter(
            [                
             re_path(r"ws/chat/(?P<room_name>[\w\d]+)/(?P<user_id>[\w\d]+)/$", ChatConsumer.as_asgi()),

            ]
        )
    ),
})