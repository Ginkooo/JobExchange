from django.db import models
from django.contrib.auth.models import AbstractUser


class Job(models.Model):
    name = models.CharField(max_length=255)


class User(AbstractUser):
    would_want = models.ManyToManyField(Job, related_name='users_wanting')
    would_do = models.ManyToManyField(Job, related_name='users_doing')
