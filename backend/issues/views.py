from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from issues.models import Issue
from issues.serializers import (IssueDetailSerializer, IssueInputSerializer,
                                IssueOutPutSerializer)
from issues.services import create_issue, update_issue


class IssueCreateView(APIView):
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
            return Response({"detail": f"{ex}"}, status=status.HTTP_400_BAD_REQUEST)

        # Return the created issue data with a 201 status
        return Response(
            IssueOutPutSerializer(issue, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class IssueListView(APIView):
    def get(self, request):
        issues = Issue.objects.all()
        serializer = IssueOutPutSerializer(issues, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class IssueDetailView(APIView):
    def get(self, request, pk):
        issue = get_object_or_404(Issue, id=pk)
        serializer = IssueDetailSerializer(issue)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        issue = get_object_or_404(Issue, id=pk)
        serializer = IssueDetailSerializer(
            instance=issue, data=request.data,  partial=True
        )
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        issue = update_issue(issue, **validated_data)

        serializer = IssueOutPutSerializer(issue)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self,request,pk):
        issue = get_object_or_404(Issue, id=pk)
        issue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)