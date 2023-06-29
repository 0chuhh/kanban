from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, mixins
from .models import User
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer


class UsersView(mixins.ListModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    """
    me action response user by token in request
    """
    @action(detail=False, methods=['get'])
    def me(self, request, *args, **kwargs):
        try:
            user = request.user
            print(user.avatar)
            return Response({
                'userId': user.pk,
                'email': user.email,
                'isStaff':user.is_staff,
                'username': user.username,
                'firstname':user.first_name,
                'middlename':user.middle_name,
                'lastname':user.last_name,
                'avatar': user.avatar.url,
                'fullname':user.full_name,
            })

        except:
            return Response('Не авторизован',status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=['post'], url_path='sign-up')
    def sign_up(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            user = User.objects.create_user(
                email=serializer.validated_data['email'],
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password'],
                first_name=serializer.validated_data['first_name'],
                middle_name=serializer.validated_data['middle_name'],
                last_name=serializer.validated_data['last_name'],
            )
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'userId': user.pk,
                'email': user.email,
                'isStaff':user.is_staff,
                'username': user.username,
                'firstname':user.first_name,
                'middlename':user.middle_name,
                'lastname':user.last_name,
                'fullname':user.full_name,
            }, status=status.HTTP_201_CREATED)
        return Response('error')
    
    def get_permissions(self):
        if self.action == 'delete':
            permission_classes = [permissions.IsAdminUser]
        if self.action == 'me':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
