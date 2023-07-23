from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, mixins
from django.db.models import Q
from .permissions import IsOwnerOrAdmin
from .models import Board, Column, Task
from .serializers import BoardSerializer, ColumnSerializer, TaskSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from accounts.models import User

class BoardView(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'], url_path=r'members/kick')
    def kick_member(self, request, pk=None):
        data = request.data
        board = Board.objects.get(pk=pk)
        print(data["user_id"])
        member = board.members.get(id=data["user_id"])
        print(member)
        if board.owner == request.user:
            if member.id != request.user.id:
                board.members.remove(member)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response('you cant kick yourself from your project',status=status.HTTP_403_FORBIDDEN)
        else:
            if member.id == request.user.id:
                board.members.remove(member)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response('you cant kick somebody from not your your project',status=status.HTTP_403_FORBIDDEN)
    
    @action(detail=True, methods=['post'], url_path=r'members/add')
    def add_member(self, request, pk=None):
        data = request.data
        board = Board.objects.get(pk=pk)
        user = User.objects.get(id=data["user_id"])
        board.members.add(user)
        return Response(status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = BoardSerializer(data=data)
        if serializer.is_valid():
            board = Board(**serializer.data, owner=request.user)
            board.save()
            board.members = [request.user],
            board.save()
            return Response({**serializer.data, 'id':board.pk},status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

    def list(self, request, *args, **kwargs):
        userMemberIn = Board.objects.filter(members__in=[request.user])
        serializer = BoardSerializer(userMemberIn, many=True)
        return Response(serializer.data)    

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
        queryset = Column.objects.filter(board__id=pk).order_by('position')
        serializer = ColumnSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data
        board = Board.objects.get(pk=data['board'])
        serializer = ColumnSerializer(data=data)
        if serializer.is_valid():
            serializer.data['board'] = board
            column = Column(
                title=serializer.data['title'],
                color=serializer.data['color'],
                position=serializer.data['position'],
                board_id=serializer.data['board']
            )
            column.save()
            return Response({**serializer.data, 'id':column.id})
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        column = Column.objects.get(pk=pk)
        column.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 

    def partial_update(self, request, pk=None):
        data = request.data
        column = Column.objects.get(pk=pk)
        column.title = data['title']
        column.color = data['color']
        column.save()
        return Response(status=status.HTTP_200_OK)
        

    @action(detail=True, methods=['patch'], url_path=r'swap')
    def swap_columns(self, request, pk=None):
        data = request.data
        changable_column = Column.objects.get(pk=pk)
        new_position = data.get('position', changable_column.position)
        if new_position != changable_column.position:
            try:
                column_with_requested_position = Column.objects.get(position=new_position)
            except:
                column_with_requested_position = None
            
            if column_with_requested_position is not None:
                column_with_requested_position.position = changable_column.position
                column_with_requested_position.save()
            
            changable_column.position = new_position
            changable_column.save()
        return Response(status=status.HTTP_200_OK)
    
class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class=TaskSerializer

    @action(detail=True, methods=['patch'], url_path=r'swap')
    def swap_tasks(self, request, pk=None):
        data = request.data
        changeble_task = Task.objects.get(pk=pk)
        new_position = data.get('position', changeble_task.position)
        new_column = Column.objects.get(pk=data.get('column', changeble_task.column.pk))
        try:
            task_with_requested_position = Task.objects.get(column=new_column, position=new_position)
        except:
            task_with_requested_position = None
       
        if new_column != changeble_task.column:
            tasks_after_new_position = Task.objects.filter(column=new_column, position__gte=new_position)
            for task in tasks_after_new_position:
                task.position += 1
                task.save()
                
            tasks_after_previous_position = Task.objects.filter(column=changeble_task.column, position__gte=changeble_task.position)
            for task in tasks_after_previous_position:
                task.position -= 1
                task.save()
        else:
             if task_with_requested_position is not None:
                if new_position < changeble_task.position:
                    tasks_before_new_position = Task.objects.filter(column=changeble_task.column, position__lt=changeble_task.position)
                    for task in tasks_before_new_position:
                        task.position += 1
                        task.save()
                if new_position > changeble_task.position:    
                    tasks_after_previous_position = Task.objects.filter(column=changeble_task.column, position__lte=new_position)
                    for task in tasks_after_previous_position:
                        task.position -= 1
                        task.save()
                

        print(changeble_task.column.pk, new_column.pk,changeble_task.column == new_column )
        changeble_task.column = new_column
        changeble_task.position = new_position
        changeble_task.save()
        return Response(status=status.HTTP_200_OK)

# Create your views here.
