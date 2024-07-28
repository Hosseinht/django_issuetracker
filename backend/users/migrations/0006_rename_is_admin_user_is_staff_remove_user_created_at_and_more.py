# Generated by Django 5.0.7 on 2024-07-28 07:20

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0005_user_created_at_user_updated_at"),
    ]

    operations = [
        migrations.RenameField(
            model_name="user",
            old_name="is_admin",
            new_name="is_staff",
        ),
        migrations.RemoveField(
            model_name="user",
            name="created_at",
        ),
        migrations.RemoveField(
            model_name="user",
            name="updated_at",
        ),
        migrations.AddField(
            model_name="user",
            name="date_joined",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
