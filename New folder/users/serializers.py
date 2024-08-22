from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone
from djoser import utils
from djoser.serializers import ActivationSerializer
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)

User = get_user_model()


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ["id", "email", "first_name", "last_name", "password", "re_password"]


class UserSerializer(BaseUserSerializer):
    date_joined = serializers.DateTimeField(format="%a %b %d %Y")

    class Meta(BaseUserSerializer.Meta):
        fields = ["id", "email", "first_name", "last_name", "date_joined"]


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(
            settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"]
        )
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid refresh token found")


class CustomActivationSerializer(ActivationSerializer):
    def validate(self, attrs):
        try:
            uid = utils.decode_uid(self.initial_data.get("uid", ""))
            self.user = User.objects.get(pk=uid)  # noqa
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            raise ValidationError({"detail": "User does not exist"})

        if self.user.is_active:
            raise ValidationError({"detail": "User is already active"})

        if (
            self.user.date_joined + settings.DJOSER["USER_ACTIVATION_TIMEOUT"]
            < timezone.now()
        ):
            raise ValidationError({"detail": "Activation link has expired"})

        is_token_valid = self.context["view"].token_generator.check_token(
            self.user, self.initial_data.get("token", "")
        )
        if not is_token_valid:
            raise ValidationError({"detail": "Failed to activate account"})

        return attrs


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["email"] = user.email

        return token
