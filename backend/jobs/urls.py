from django.urls import path, include

from rest_framework import routers

import jobs.views.user
import jobs.views.job


router = routers.DefaultRouter()
router.register('user', jobs.views.user.UserViewSet)
router.register('job', jobs.views.job.JobViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
