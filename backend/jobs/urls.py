from django.urls import path, include

from rest_framework import routers

import jobs.views.user
import jobs.views.job
import jobs.views.deal


router = routers.DefaultRouter()
router.register('user', jobs.views.user.UserViewSet)
router.register('job', jobs.views.job.JobViewSet)
router.register('deal', jobs.views.deal.DealViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
