from django.contrib import admin
from .models import Board, Column, Status, Task

admin.site.register(Board)
admin.site.register(Column)
admin.site.register(Status)
admin.site.register(Task)
