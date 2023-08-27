from rest_framework import serializers
from .models import User

class UserSerializer(serializers.Serializer):
    userId = serializers.IntegerField(read_only=True, source='pk')
    email = serializers.EmailField(required=False)
    username = serializers.CharField(max_length=100,)
    password = serializers.CharField(max_length=100, write_only=True)
    firstname = serializers.CharField(max_length=100, source='first_name')
    middlename = serializers.CharField(max_length=100, required=False, source='middle_name')
    lastname = serializers.CharField(max_length=100, source='last_name')
    avatar = serializers.ImageField(required=False, max_length=None, use_url=True, allow_null=True, )
    fullname = serializers.ReadOnlyField(source='full_name')
    
    
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
