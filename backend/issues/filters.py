from django_filters import ChoiceFilter
from django_filters.rest_framework import FilterSet

from .models import Issue

STATUSES = [
    ("OPEN", "OPEN"),
    ("IN_PROGRESS", "IN_PROGRESS"),
    ("CLOSED", "CLOSED"),
]


class StatusFilter(FilterSet):
    status = ChoiceFilter(choices=STATUSES)

    class Meta:
        model = Issue
        fields = ["status"]
