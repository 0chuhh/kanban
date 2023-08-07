from rest_framework import serializers
from .models import Board, Column, Task, Status
from accounts.serializers import UserSerializer
from rest_framework.validators import UniqueValidator


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class BoardSerializer(serializers.ModelSerializer):
    owner = UserSerializer(required=False,)
    members = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Board
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    status = StatusSerializer(required=False)
    def validate(self, data):
        if len(Task.objects.filter(column_id=data['column'],position=data['position']))>0:
            raise serializers.ValidationError("task with same position in this column already exists")
        return data
    
    class Meta:
        model = Task
        fields = '__all__'


class ColumnSerializer(serializers.ModelSerializer):
    
    tasks = serializers.SerializerMethodField(read_only=True)

    def get_tasks(self, instance):
        try:
            tasks = instance.tasks.all().order_by('position')
            return TaskSerializer(tasks, many=True, read_only=True).data
        except:
            return
    
    
    class Meta:
        model = Column
        fields = '__all__'