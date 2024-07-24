from django.shortcuts import get_object_or_404

from .models import Issue


def create_issue(*, title: str, description: str):
    return Issue.objects.create(title=title, description=description)


def update_issue(issue, **kwargs):
    for key, value in kwargs.items():
        setattr(issue, key, value)
    issue.save()
    return issue
