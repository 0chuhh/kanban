from django.urls import include, path
from rest_framework import routers
from .views import BoardView

router = routers.SimpleRouter()
router.register('', BoardView)


urlpatterns = [
    path('', include(router.urls)),
]