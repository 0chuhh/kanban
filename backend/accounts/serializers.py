from rest_framework import serializers
from .models import User

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    username = serializers.CharField(max_length=100, write_only=True)
    password = serializers.CharField(max_length=100, write_only=True)
    first_name = serializers.CharField(max_length=100)
    middle_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100)
    avatar = serializers.ImageField(required=False)
    full_name = serializers.ReadOnlyField()
    class Meta:
        model = User
        fields = '__all__'
