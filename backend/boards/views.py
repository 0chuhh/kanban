from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, mixins

from .permissions import IsOwnerOrAdmin
from .models import Board, Column, Task
from .serializers import BoardSerializer, ColumnSerializer, TaskSerializer
from rest_framework.response import Response

class BoardView(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'delete':
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
        if self.action == 'update':
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    

class ColumnView(viewsets.ViewSet):
    
    def retrieve(self, request, pk=None):
        queryset = Column.objects.filter(board__id=pk)
        serializer = ColumnSerializer(queryset, many=True)
        return Response(serializer.data)
    
class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class=TaskSerializer


# Create your views here.
