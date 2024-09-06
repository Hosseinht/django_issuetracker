from datetime import timedelta

from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone

# Create your models here.

User = get_user_model()


class Issue(models.Model):
    class Status(models.TextChoices):
        OPEN = "OPEN"
        IN_PROGRESS = "IN_PROGRESS"
        CLOSED = "CLOSED"

    class Priority(models.TextChoices):
        HIGH = "HIGH"
        MEDIUM = "MEDIUM"
        LOW = "LOW"

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=12,
        choices=Status.choices,
        default=Status.OPEN,
    )
    priority = models.CharField(max_length=8, choices=Priority.choices)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Set due_date based on priority before saving
        if not self.due_date:  # Only set due_date if it's not already set
            if self.priority == self.Priority.HIGH:
                self.due_date = self.created_at + timedelta(days=1)
            elif self.priority == self.Priority.MEDIUM:
                self.due_date = self.created_at + timedelta(days=2)
            elif self.priority == self.Priority.LOW:
                self.due_date = self.created_at + timedelta(days=3)

        super(Issue, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
        return self.title
