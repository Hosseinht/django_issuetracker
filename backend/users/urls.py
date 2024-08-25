from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from .views import (
    AuthCheckView,
    CustomUserViewSet,
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    JWTCookieTokenVerifyView,
    JWTProviderAuthView,
    LogoutView,
)

router = DefaultRouter()
router.register("users", CustomUserViewSet)

urlpatterns = [
    re_path(
        r"^o/(?P<provider>\S+)/$",
        JWTProviderAuthView.as_view(),
        name="provider-auth",
    ),
    path(
        "jwt/create/", JWTCookieTokenObtainPairView.as_view(), name="create-jwt-token"
    ),
    path("jwt/refresh/", JWTCookieTokenRefreshView.as_view(), name="refresh-jwt-token"),
    path("jwt/verify/", JWTCookieTokenVerifyView.as_view(), name="verify-jwt-token"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("check/", AuthCheckView.as_view(), name="auth_check"),
    path("", include(router.urls)),
]
