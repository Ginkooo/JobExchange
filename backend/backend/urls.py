"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

import rest_framework.authtoken.views

import jobs.urls
import jobs.views.auth
import jobs.views.job

urlpatterns = [
    path('api/favjob/', jobs.views.job.add_favorite_job),
    path('api/', include(jobs.urls.router.urls)),
    path('admin/', admin.site.urls),
    path('get-token/', rest_framework.authtoken.views.obtain_auth_token),
    path('api-auth/', include('rest_framework.urls')),
    path('signup/', jobs.views.auth.sign_up),
]
