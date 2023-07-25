from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    owner = UserSerializer(required=False, read_only=True)
    class Meta:
        model = Comment
        fields = ('id','task', 'owner', 'date_created', 'date_updated', 'text')

        