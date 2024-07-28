from rest_framework import serializers

from issues.models import Issue


class IssueInputSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=True)
    description = serializers.CharField(required=True)


class IssueUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ("title", "description", "status")


class IssueOutPutSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%a %b %d %Y")

    class Meta:
        model = Issue
        fields = (
            "id",
            "title",
            "status",
            "created_at",
        )


class IssueDetailSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%a %b %d %Y")
    updated_at = serializers.DateTimeField(format="%a %b %d %Y")

    class Meta:
        model = Issue
        fields = (
            "id",
            "title",
            "description",
            "status",
            "created_at",
            "updated_at",
        )
