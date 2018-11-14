from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser

from rest_framework import viewsets, permissions, response

from jobs import serializers


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = get_user_model().objects.all()
    serializer_class = serializers.UserSerializer

    search_fields = ('username',)
    filter_fields = ('would_do',)

    def list(self, request):
        if request.GET.get('related') == 'true' and not isinstance(self.request.user, AnonymousUser):
            return response.Response({
                'users_would_do': self._get_users_grouped_by_job('would_do'),
                'users_would_employ': self._get_users_grouped_by_job('would_want')
            })
        return super().list(request)

    def _get_users_grouped_by_job(self, relation):
        relation_mapping = {
            'would_do': 'would_want',
            'would_want': 'would_do',
        }

        ret = {}

        for job in getattr(self.request.user, relation_mapping[relation]).all():
            users = ret.setdefault(job.name, [])
            if relation == 'would_want':
                related_users = get_user_model().objects.filter(would_want__in=[job])
            elif relation == 'would_do':
                related_users = get_user_model().objects.filter(would_do__in=[job])
            else:
                raise Exception('Bad relation type')
            serializer = self.serializer_class(related_users, many=True)
            users += serializer.data

        return ret
