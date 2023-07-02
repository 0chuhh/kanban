from django.urls import include, path
from rest_framework import routers
from .views import BoardView, ColumnView

router = routers.SimpleRouter()
router.register(r'boards', BoardView, basename='board')
router.register(r'column', ColumnView, basename='column')


urlpatterns = [
    path('', include(router.urls)),
]