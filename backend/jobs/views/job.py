from rest_framework import viewsets

from jobs import models, serializers, permissions


class JobViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminOrReadOnly,)

    queryset = models.Job.objects.all()
    serializer_class = serializers.JobSerializer
