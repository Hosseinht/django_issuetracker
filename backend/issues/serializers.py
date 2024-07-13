from rest_framework import serializers

from issues.models import Issue


class IssueInputSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=True)
    description = serializers.CharField(required=True)


class IssueOutPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = (
            "title",
            "description",
            "status",
            "created_at",
            "updated_at",
        )
