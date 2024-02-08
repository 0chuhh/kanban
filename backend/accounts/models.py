from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    UserManager,
)
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils import timezone

class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        "username",
        max_length=150,
        unique=True,
        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
        validators=[username_validator],
        error_messages={
            "unique": "A user with that username already exists.",
        },
    )
    email = models.EmailField("email address", blank=True, null=True)
    
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='media/accounts/avatars/', blank=True, default='avatar.svg')
    
    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into this admin site."
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text="Designates whether this user should be treated as active. "
    )
    date_joined = models.DateTimeField("date joined", default=timezone.now)

    USERNAME_FIELD = "username"

    @property
    def full_name(self):
        if self.first_name and self.last_name:
            return f'{self.first_name} {self.middle_name} {self.last_name}'.replace('  ',' ')
        else:
            return f'{self.username}'.replace('  ',' ')
    
    def __str__(self):
        return f'{self.id} - {self.full_name}'
