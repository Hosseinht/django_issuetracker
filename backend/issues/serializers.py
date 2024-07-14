from rest_framework import serializers

from issues.models import Issue


class IssueInputSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=True)
    description = serializers.CharField(required=True)


class IssueOutPutSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%a %b %d %Y")

    # def to_representation(self, instance):
    #     representation = super(IssueOutPutSerializer, self).to_representation(instance)
    #     representation["created_at"] = instance.created_at.strftime("%a %b %d %Y")
    #     return representation

    class Meta:
        model = Issue
        fields = (
            "title",
            "description",
            "status",
            "created_at",
            "updated_at",
        )
