from rest_framework.pagination import LimitOffsetPagination


class IssuePagination(LimitOffsetPagination):
    max_limit = 20
