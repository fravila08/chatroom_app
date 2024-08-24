from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as s
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from .models import UserSerializer

# Create your views here.


class Register(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = request.data.get("email")
        new_user = UserSerializer(data=data, partial=True)
        if new_user.is_valid():
            new_user = new_user.save()
            login(request, new_user)
            return Response(
                {"username": new_user.email, "token": new_user.auth_token.key},
                status=s.HTTP_201_CREATED,
            )
        else:
            return Response(new_user.errors, status=s.HTTP_400_BAD_REQUEST)


class LogIn(APIView):
    def post(self, request):
        data = request.data.copy()
        email =  data.get("email")
        password = data.get("password")
        user = authenticate(request, username=email, password=password)
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {"username": user.email, "token": token.key},
                status=s.HTTP_201_CREATED,
            )
        else:
            return Response("No user matching credentials", status=s.HTTP_404_NOT_FOUND)


class UserViews(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Info(UserViews):
    def get(self, request):
        user = request.user
        return Response(
            {"username": user.email, "token": user.auth_token.key},
            status=s.HTTP_200_OK,
        )


class LogOut(UserViews):
    def post(self, request):
        user = request.user
        logout(request)
        user.aut_token.delete()
        return Response("Logged Out", status=s.HTTP_200_OK)
