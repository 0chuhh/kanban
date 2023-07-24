from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, mixins
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.decorators import action
from rest_framework.response import Response




class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(reply__isnull=True)
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'], url_path=r'by-task')
    def by_task(self, request, pk=None):
        comments = Comment.objects.filter(task_id=pk, reply__isnull=True)
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data)