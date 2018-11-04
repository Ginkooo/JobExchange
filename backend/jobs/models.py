from django.db import models
from django.contrib.auth.models import AbstractUser


class Job(models.Model):
    name = models.CharField(max_length=255)


class User(AbstractUser):
    would_want = models.ManyToManyField(Job, related_name='users_wanting')
    would_do = models.ManyToManyField(Job, related_name='users_doing')


class Deal(models.Model):
    employee = models.ForeignKey(User, null=True, related_name='deals_gave', on_delete=models.SET_NULL)
    employer = models.ForeignKey(User, null=True, related_name='deals_took', on_delete=models.SET_NULL)
    job = models.ForeignKey(Job, related_name='deals', on_delete=models.CASCADE)
    employee_approved = models.BooleanField(default=False)
    employer_approved = models.BooleanField(default=False)

    @property
    def is_made(self):
        return self.employee_approved and self.employer_approved
