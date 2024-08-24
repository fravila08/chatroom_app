from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser
from rest_framework.serializers import ModelSerializer
from rest_framework.authtoken.models import Token


# Create your models here.
class AppUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class UserSerializer(ModelSerializer):

    class Meta:
        model = AppUser
        fields = "__all__"

    def create(self, validated_data):
        try:
            password = validated_data.pop('password')  
            new_user = AppUser(**validated_data)  
            new_user.set_password(password)
            new_user.clean()
            new_user.save()
            Token.objects.create(user=new_user)
            return new_user
        except Exception as e:
            return e
