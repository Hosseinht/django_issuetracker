from django.contrib.auth import get_user_model

from .models import Issue

User = get_user_model()


def create_issue(*, title: str, description: str):
    return Issue.objects.create(title=title, description=description)


def update_issue(issue, **kwargs):
    # if "user" in kwargs:
    #     user_id = kwargs["user"]
    #     user = User.objects.get(email=user_id)
    #     kwargs["user"] = user  # Now kwargs['user'] is a User instance

    for key, value in kwargs.items():
        setattr(issue, key, value)
    issue.save()
    return issue
