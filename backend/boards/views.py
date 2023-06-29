from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, mixins

from .permissions import IsOwnerOrAdmin
from .models import Board
from .serializers import BoardSerializer


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
# Create your views here.
