from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication

#  raw_token = request.COOKIES.get(settings.SIMPLE_JWT["َACCESS_TOKEN_NAME"])


class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:
            header = self.get_header(request)

            if header is None:
                raw_token = request.COOKIES.get(
                    settings.SIMPLE_JWT["َACCESS_TOKEN_NAME"]
                )
            else:
                raw_token = self.get_raw_token(header)

            if raw_token is None:
                return None

            validated_token = self.get_validated_token(raw_token)

            return self.get_user(validated_token), validated_token
        except:  # noqa: E722
            return None
