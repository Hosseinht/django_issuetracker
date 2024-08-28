from django.contrib.auth import get_user_model
from rest_framework import serializers

from issues.models import Issue

User = get_user_model()


# class SimpleUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = (
#             "id",
#             "email",
#         )


class IssueInputSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=True)
    description = serializers.CharField(required=True)


class IssueUpdateSerializer(serializers.ModelSerializer):
    # user = serializers.SlugRelatedField(slug_field="user")

    class Meta:
        model = Issue
        fields = ("user", "title", "description", "status")


class IssueOutPutSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%a %b %d %Y")
    user = serializers.StringRelatedField()

    class Meta:
        model = Issue
        fields = (
            "id",
            "user",
            "title",
            "status",
            "created_at",
        )


class IssueDetailSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%a %b %d %Y")
    updated_at = serializers.DateTimeField(format="%a %b %d %Y")
    user = serializers.StringRelatedField()

    class Meta:
        model = Issue
        fields = (
            "id",
            "user",
            "title",
            "description",
            "status",
            "created_at",
            "updated_at",
        )
