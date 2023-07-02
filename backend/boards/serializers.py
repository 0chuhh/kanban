from rest_framework import serializers
from .models import Board, Members, Column, Task
from accounts.serializers import UserSerializer


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
    class Meta:
        model = Task
        fields = '__all__'


class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    class Meta:
        model = Column
        fields = '__all__'