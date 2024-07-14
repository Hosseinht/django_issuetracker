from django.contrib import admin
from django.urls import path

from .views import IssueCreateView, IssueListView

urlpatterns = [
    path("issue/create/", IssueCreateView.as_view(), name="create-issue"),
    path("issue/", IssueListView.as_view(), name="list-issues"),
]
