from django.contrib import admin

from .models import Issue

# Register your models here.


class IssueAdmin(admin.ModelAdmin):
    ordering = ("id", "title", "created_at", "updated_at")
    list_display = ["title", "user", "status", "created_at", "updated_at"]


admin.site.register(Issue, IssueAdmin)
