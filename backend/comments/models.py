from django.db import models
from boards.models import Task
from django.conf import settings

class Comment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_created = models.DateField(auto_now=True)
    date_updated = models.DateField(null=True, blank=True)
    text = models.TextField()
    reply = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
