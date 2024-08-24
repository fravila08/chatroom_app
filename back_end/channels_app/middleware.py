from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from urllib.parse import parse_qs
from django.apps import apps

@database_sync_to_async
def get_user(token_key):
    Token = apps.get_model('authtoken', 'Token')  # Get Token model dynamically
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return AnonymousUser()

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope["query_string"].decode())
        token_key = query_string.get("token")
        if token_key:
            scope['user'] = await get_user(token_key[0])
        return await super().__call__(scope, receive, send)


