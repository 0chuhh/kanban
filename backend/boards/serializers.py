from rest_framework import serializers
from .models import Board, Members, Column, Task
from accounts.serializers import UserSerializer
from rest_framework.validators import UniqueValidator

class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    class Meta:
        model = Members
        fields = '__all__'


class BoardSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True, read_only=True)
    class Meta:
        model = Board
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if len(Task.objects.filter(column_id=data['column'],position=data['position']))>0:
            raise serializers.ValidationError("task with same position in this column already exists")
        return data
    
    class Meta:
        model = Task
        fields = '__all__'


class ColumnSerializer(serializers.ModelSerializer):
    
    tasks = serializers.SerializerMethodField()

    def get_tasks(self, instance):
        tasks = instance.tasks.all().order_by('position')
        print('hui')
        return TaskSerializer(tasks, many=True, read_only=True).data
    class Meta:
        model = Column
        fields = '__all__'