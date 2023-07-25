from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, mixins
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status



class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(reply__isnull=True)
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get','post'], url_path=r'by-task')
    def by_task(self, request, pk=None):
        if request.method == 'GET':
            result = []
            comments = Comment.objects.filter(task_id=pk, reply__isnull=True)
            for comment in comments:
                serializer = CommentSerializer(comment)
                replies = Comment.objects.filter(task_id=pk, reply=comment.id)
                replies_serializer = CommentSerializer(replies, many=True)
                result.append({**serializer.data, 'replies':replies_serializer.data })
            return Response(result)
        else:
            data = request.data
            comment = Comment(task_id=pk, owner=request.user, text=data['text'])
            try:
                comment.reply = Comment.objects.get(pk=data['reply'])
            except:
                ...
            comment.save()
            comment_serializer = CommentSerializer(comment)
            return Response(comment_serializer.data,status=status.HTTP_201_CREATED)
