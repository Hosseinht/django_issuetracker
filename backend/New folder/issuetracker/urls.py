from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    path("api/", include("issues.urls")),
    path("auth/", include("users.urls")),
    path("auth/", include("djoser.social.urls")),
]
