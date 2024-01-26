import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
# from . import routing
from Chatapp.consumers import ChatConsumer
from django.urls import re_path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Chat.settings")

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            [
                re_path(r"ws/chat/(?P<room_name>[\w\d]+)/(?P<username>[\w\d]+)/$", ChatConsumer.as_asgi()),
                # re_path(r"ws/notify/(?P<username>[\w\d]+)/$", NotificationConsumer.as_asgi()),
            ]
        )
    ),
})