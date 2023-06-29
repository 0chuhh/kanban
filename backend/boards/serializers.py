from rest_framework import serializers
from .models import Board, Members


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = '__all__'


class BoardSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True, read_only=True)
    class Meta:
        model = Board
        fields = '__all__'