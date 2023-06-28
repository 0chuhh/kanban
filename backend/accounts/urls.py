from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from .views import UsersView
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth.views import LoginView

router = routers.SimpleRouter()
router.register('', UsersView)


urlpatterns = [
    path('sign-in/', obtain_auth_token),
    path('', include(router.urls)),
]