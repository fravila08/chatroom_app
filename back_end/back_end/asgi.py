"""
ASGI config for back_end project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels_app.views import TokenAuthMiddleware

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "back_end.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": TokenAuthMiddleware(
            URLRouter("channels_app.routing.websocket_urlpatterns")
        ),
    }
)
