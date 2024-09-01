from typing import Any

from django.contrib import admin
from django.db.models.query import QuerySet
from django.http import HttpRequest

from .models import Issue

# Register your models here.


class IssueAdmin(admin.ModelAdmin):
    ordering = ("id", "title", "created_at", "updated_at")
    list_display = ["title", "user", "status", "created_at", "updated_at"]

    def get_queryset(self, request: HttpRequest) -> QuerySet[Any]:
        queryset = super().get_queryset(request)
        queryset = queryset.prefetch_related("user")
        return queryset


admin.site.register(Issue, IssueAdmin)
