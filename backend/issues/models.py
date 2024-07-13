from django.db import models
from django.utils import timezone

# Create your models here.


class Issue(models.Model):
    class Status(models.TextChoices):
        OPEN = "O", "Open"
        IN_PROGRESS = "I", "In Progress"
        CLOSE = "C", "CLOSE"

    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=1,
        choices=Status.choices,
        default=Status.OPEN,
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
