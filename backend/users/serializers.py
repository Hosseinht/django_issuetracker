from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ["id", "email", "name", "password", "re_password"]


class UserSerializer(BaseUserSerializer):
    date_joined = serializers.DateTimeField(format="%a %b %d %Y")

    class Meta(BaseUserSerializer.Meta):
        fields = ["id", "email", "name", "date_joined"]
