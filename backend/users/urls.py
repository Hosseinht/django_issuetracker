from django.urls import include, path, re_path, reverse
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

# Djoser provides endpoints for resetting and setting the username (email),
# but there is no need for this functionality in the application. Therefore, the URLs
# for these actions have been excluded, ensuring that no endpoints are created for them.
excluded_url_names = [
    "user-reset-username",
    "user-set-username",
    "user-reset-username-confirm",
]
filtered_urls = [url for url in router.urls if url.name not in excluded_url_names]


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
    path("", include(filtered_urls)),
]
