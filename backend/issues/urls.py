from django.contrib import admin
from django.urls import path

from .views import IssueCreateView, IssueDetailView, IssueListView

urlpatterns = [
    path("issue/create/", IssueCreateView.as_view(), name="create-issue"),
    path("issue/", IssueListView.as_view(), name="list-issues"),
    path("issue/<int:pk>/", IssueDetailView.as_view(), name="get-issue"),
]
