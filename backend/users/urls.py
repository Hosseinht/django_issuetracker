from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    JWTCookieTokenVerifyView,
    JWTProviderAuthView,
    LogoutView,
    CustomUserViewSet,
)


router = DefaultRouter()
router.register("users", CustomUserViewSet)

urlpatterns = [
    path("google-oauth2/", JWTProviderAuthView.as_view(), name="provider-auth"),
    path(
        "jwt/create/", JWTCookieTokenObtainPairView.as_view(), name="create-jwt-token"
    ),
    path("jwt/refresh/", JWTCookieTokenRefreshView.as_view(), name="refresh-jwt-token"),
    path("jwt/verify/", JWTCookieTokenVerifyView.as_view(), name="verify-jwt-token"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("", include(router.urls)),  # Include the router's URLs under the root path
]
