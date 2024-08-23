from typing import Optional, Tuple

from django.conf import settings
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import AuthUser, JWTAuthentication
from rest_framework_simplejwt.tokens import Token


class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request: Request) -> Optional[Tuple[AuthUser, Token]]:
        try:
            header = self.get_header(request)
            if header is None:
                raw_token = request.COOKIES.get(settings.COOKIE_NAME)
            else:
                raw_token = self.get_raw_token(header)

            if raw_token is None:
                return None

            validated_token = self.get_validated_token(raw_token)

            return self.get_user(validated_token), validated_token
        except:  # noqa: E722
            return None
