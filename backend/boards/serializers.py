from rest_framework import serializers
from .models import Board, Members
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