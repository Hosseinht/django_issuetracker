# Generated by Django 5.0.7 on 2024-07-17 07:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("issues", "0003_alter_issue_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="issue",
            name="status",
            field=models.CharField(
                choices=[
                    ("OPEN", "Open"),
                    ("IN_PROGRESS", "In Progress"),
                    ("CLOSED", "Closed"),
                ],
                default="OPEN",
                max_length=12,
            ),
        ),
    ]
