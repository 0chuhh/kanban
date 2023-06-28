from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='static/media/accounts/avatars/', blank=True, default='')

    @property
    def full_name(self):
        return f'{self.first_name} {self.middle_name} {self.last_name}'.replace('  ',' ')
    
    def __str__(self):
        return f'{self.id} - {self.full_name}'
