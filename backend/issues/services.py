from .models import Issue


def create_issue(*, title: str, description: str):
    return Issue.objects.create(title=title, description=description)
