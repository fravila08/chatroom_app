from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class AppUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
