from django.contrib import admin
from django.urls import path

from .views import CreateIssueView

urlpatterns = [
    path("issue/create/", CreateIssueView.as_view(), name="create-issue"),
]
