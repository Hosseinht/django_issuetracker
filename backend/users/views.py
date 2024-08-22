from django.conf import settings
from djoser.social.views import ProviderAuthView
from djoser.views import UserViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from users.serializers import (
    CustomActivationSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
)


class JWTSetCookieMixin:
    """Mixin to set JWT tokens as cookies in the response."""

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                secure=settings.COOKIE_SECURE,
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )

        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["َACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                secure=settings.COOKIE_SECURE,
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )
            del response.data["access"]

        response.set_cookie(
            "logged_in",
            "true",
            max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            secure=settings.COOKIE_SECURE,
            httponly=False,
            samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
        )

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


class JWTCookieTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT["َACCESS_TOKEN_NAME"])
        if access_token:
            request.data["token"] = access_token
        return super().post(request, *args, **kwargs)


class JWTProviderAuthView(JWTSetCookieMixin, ProviderAuthView):
    """View for social authentication with JWT token set as a cookie."""

    pass


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        response.delete_cookie("logged_in")

        return response


class CustomUserViewSet(UserViewSet):
    def get_serializer_class(self):
        if self.action == "activation":  # noqa
            return CustomActivationSerializer
        return super().get_serializer_class()


class AuthCheckView(APIView):
    def get(self, request):
        user = request.user

        if user.is_authenticated:
            user_data = {
                "email": user.email,
            }
            response_data = {"isAuthenticated": True, "user": user_data}
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data = {"isAuthenticated": False}
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
