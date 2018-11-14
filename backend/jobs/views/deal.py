from rest_framework import viewsets

from jobs import serializers, models


class DealViewSet(viewsets.ModelViewSet):
    queryset = models.Deal.objects.all()
    serializer_class = serializers.DealSerializer
