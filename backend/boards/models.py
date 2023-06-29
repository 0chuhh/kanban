from django.db import models
from colorfield.fields import ColorField
from django.conf import settings
from datetime import datetime

class Board(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    date_created = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Доска'
        verbose_name_plural = 'Доски'


class Members(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='пользователь')
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='members')
    is_owner = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.user.full_name
    
    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'


class Status(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = 'Статус'
        verbose_name_plural = 'Статусы'

    

class Column(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    color = ColorField(default='#FF0000')
    position = models.IntegerField()
    date_created = models.DateField(auto_now=True)
    default_task_status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = 'Колонка'
        verbose_name_plural = 'Колонки'


class Task(models.Model):
    column = models.ForeignKey(Column, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    date_created = models.DateField(auto_now=True)
    date_updated = models.DateField(null=True, blank=True)
    deadline = models.DateTimeField(null=True, blank=True)
    sabtasks = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    position = models.IntegerField()
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    performers = models.ManyToManyField(Members, blank=True)

    @property
    def is_overdue(self):
        if self.date_updated is None:
            return datetime.now() > self.deadline
        else:
            return self.deadline > self.date_updated

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'