from django.urls import include, path
from rest_framework import routers
from .views import CommentView

router = routers.SimpleRouter()
router.register(r'', CommentView)


urlpatterns = [
    path('', include(router.urls)),
]