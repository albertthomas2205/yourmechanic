# asgi.py
import os

from channels.auth import AuthMiddlewareStack 
from channels.rounting import ProtocolTypeRouter, URLRouter 

from django.core.asgi import get_asgi_application

import chatapp.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE','chatty.settings')


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chatapp.routing.websocket_urlpatterns
        )
    )
})

