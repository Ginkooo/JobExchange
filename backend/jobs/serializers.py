from django.contrib.auth import get_user_model

from rest_framework import serializers

from jobs import models


class JobSerializer(serializers.ModelSerializer):
    would_do = serializers.BooleanField(
        read_only=True
    )
    would_want = serializers.BooleanField(
        read_only=True
    )

    class Meta:
        model = models.Job
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    would_want = JobSerializer(many=True)
    would_do = JobSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = 'id username email would_want would_do'.split()


class DealSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Deal
        fields = '__all__'
