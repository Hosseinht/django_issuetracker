from django_filters import ChoiceFilter
from django_filters.rest_framework import FilterSet

from .models import Issue

STATUSES = [
    ("OPEN", "OPEN"),
    ("IN_PROGRESS", "IN_PROGRESS"),
    ("CLOSED", "CLOSED"),
]

PRIORITIES = [
    ("LOW", "LOW"),
    ("MEDIUM", "MEDIUM"),
    ("HIGH", "HIGH"),
]


class StatusFilter(FilterSet):
    status = ChoiceFilter(choices=STATUSES)
    priority = ChoiceFilter(choices=PRIORITIES)

    class Meta:
        model = Issue
        fields = ["status", "priority"]
