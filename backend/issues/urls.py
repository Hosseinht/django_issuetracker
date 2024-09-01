from django.urls import path

from .views import IssueCreateView, IssueDetailView, IssueListView, IssueStatusCountView

urlpatterns = [
    path("issue/", IssueListView.as_view(), name="list-issues"),
    path("issue/create/", IssueCreateView.as_view(), name="create-issue"),
    path(
        "issue/status-count/",
        IssueStatusCountView.as_view(),
        name="issue-status-count",
    ),
    path("issue/<int:pk>/", IssueDetailView.as_view(), name="get-issue"),
]
