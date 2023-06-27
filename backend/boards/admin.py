from django.contrib import admin
from .models import Board, Members, Column, Status, Task

admin.site.register(Board)
admin.site.register(Column)
admin.site.register(Status)
admin.site.register(Members)
admin.site.register(Task)
