from rest_framework import viewsets

from jobs import models
from jobs import serializers


class JobViewSet(viewsets.ModelViewSet):
    queryset = models.Job.objects.all()
    serializer_class = serializers.JobSerializer
