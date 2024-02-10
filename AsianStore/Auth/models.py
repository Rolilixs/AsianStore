from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.contrib.auth.hashers import make_password
# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, username, email, password, phone_number):
        """ Создает и возвращает пользователя с имэйлом, паролем и именем. """
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username,
                          email=self.normalize_email(email),
                          phone_number=phone_number)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password, phone_number):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password, phone_number)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(verbose_name="Имя пользователя", max_length=32)
    # Использовать сторонний метод для хранения номера телефона
    phone_number = models.CharField(verbose_name="Номер телефона", unique=True, max_length=11)
    email = models.EmailField(null=True, blank=True, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['username', 'email']

    objects = UserManager()

    def __str__(self):
        return self.username

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username
