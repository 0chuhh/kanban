from rest_framework import serializers
from .models import User

class UserSerializer(serializers.Serializer):
    userId = serializers.IntegerField(read_only=True, source='pk')
    email = serializers.EmailField(required=False)
    username = serializers.CharField(max_length=100, write_only=True)
    password = serializers.CharField(max_length=100, write_only=True)
    firstname = serializers.CharField(max_length=100, source='first_name')
    middlename = serializers.CharField(max_length=100, required=False, source='middle_name')
    lastname = serializers.CharField(max_length=100, source='last_name')
    avatar = serializers.ImageField(required=False, )
    fullname = serializers.ReadOnlyField(source='full_name')
    class Meta:
        model = User
        fields = '__all__'
