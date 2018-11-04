from django.contrib.auth import get_user_model

from rest_framework import viewsets, permissions

from jobs import serializers


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserSerializer
