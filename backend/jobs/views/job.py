import json

from django.db.models import Case, When, Value, BooleanField
from django.contrib.auth.models import AnonymousUser
from rest_framework import viewsets

from jobs import models, serializers, permissions


class JobViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminOrReadOnly,)

    queryset = models.Job.objects.all()
    serializer_class = serializers.JobSerializer

    def get_queryset(self):
        if isinstance(self.request.user, AnonymousUser):
            return models.Job.objects.all()\
                    .annotate(would_do=Value(False, BooleanField()),
                              would_want=Value(False, BooleanField()))

        would_want_ids = [j.id for j in self.request.user.would_want.all()]
        would_do_ids = [j.id for j in self.request.user.would_do.all()]

        return models.Job.objects.all().annotate(
            would_want=Case(
                When(pk__in=would_want_ids, then=Value(True, BooleanField())),
                default=Value(False, BooleanField())
            ),
            would_do=Case(
                When(pk__in=would_do_ids, then=Value(True, BooleanField())),
                default=Value(False, BooleanField())
            ))
