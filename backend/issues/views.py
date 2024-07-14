from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from issues.models import Issue
from issues.serializers import IssueInputSerializer, IssueOutPutSerializer
from issues.services import create_issue

# class CreateIssueView(CreateAPIView):
#     serializer_class = IssueInputSerializer
#     queryset = Issue.objects.all()

# def perform_create(self, serializer):
#     # serializer = IssueInputSerializer(data=request.data)
#     # serializer.is_valid(raise_exception=True)
#     # print(serializer)
#     serializer.save()
#     return Response(serializer.data, status=status.HTTP_201_CREATED)


class CreateIssueView(APIView):
    def post(self, request):
        serializer = IssueInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        try:
            issue = create_issue(
                title=validated_data["title"],
                description=validated_data["description"],
            )

        except Exception as ex:
            return Response({"detail": "error"}, status=status.HTTP_400_BAD_REQUEST)

        # Return the created issue data with a 201 status
        return Response(
            IssueOutPutSerializer(issue, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )
