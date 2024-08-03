from django.urls import path

from .views import (JWTCookieTokenObtainPairView, JWTCookieTokenRefreshView,
                    JWTCookieTokenVerifyView, LogoutView)

urlpatterns = [
    path(
        "jwt/create/", JWTCookieTokenObtainPairView.as_view(), name="create-jwt-token"
    ),
    path("jwt/refresh/", JWTCookieTokenRefreshView.as_view(), name="refresh-jwt-token"),
    path("jwt/verify/", JWTCookieTokenVerifyView.as_view(), name="verify-jwt-token"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
