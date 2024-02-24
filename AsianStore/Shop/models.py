from django.forms import forms
from django.db import models
from django.utils.safestring import mark_safe
from Auth.models import User
from rest_framework.authtoken.models import Token


# ============= USER ZONE =============
# class User(models.Model):
#     username = models.CharField(verbose_name="Имя пользователя", max_length=32)
#     password = models.CharField(verbose_name="Пароль", max_length=128)
#     # Использовать сторонний метод для хранения номера телефона
#     phone_number = models.CharField(verbose_name="Номер телефона", max_length=11)
#     email = models.EmailField(null=True, blank=True)
#
#     def __str__(self):
#         return self.username
#
#     class Meta:
#         verbose_name = "Пользователь"
#         verbose_name_plural = "Пользователи"


class Favourite(models.Model):
    product_id = models.ForeignKey("Product", verbose_name="Продукт", on_delete=models.PROTECT)
    user_id = models.ForeignKey(User, verbose_name="Пользователь", on_delete=models.PROTECT)

    class Meta:
        verbose_name = "Избранное"
        verbose_name_plural = "Избранное"


# ============= PRODUCT ZONE =============
class Product(models.Model):
    name = models.CharField(verbose_name="Название", max_length=128)
    description = models.TextField(verbose_name="Описание", max_length=2048)
    price = models.DecimalField(verbose_name="Стоимость", max_digits=10, decimal_places=2)
    count_in_stock = models.IntegerField(verbose_name="Количество на складе")
    barcode = models.CharField(verbose_name="Баркод", max_length=13)
    main_image = models.ImageField(verbose_name="Главное изображение", upload_to="main_product_images")
    category_id = models.ForeignKey("Category", verbose_name="Категория", on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.name} ({self.price}). Кол-во: {self.count_in_stock}"

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class ProductImage(models.Model):
    image = models.ImageField(verbose_name="Изображение", upload_to="product_images")
    product_id = models.ForeignKey("Product", verbose_name="Товар", on_delete=models.CASCADE, related_name='photos')

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"


class Category(models.Model):
    name = models.CharField(verbose_name="Название", max_length=128)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


# ============= ORDERING ZONE =============
class OrderStatus(models.Model):
    name = models.CharField(verbose_name="Название", max_length=32)

    class Meta:
        verbose_name = "Статус заказа"
        verbose_name_plural = "Статусы заказа"


class PaymentType(models.Model):
    name = models.CharField(verbose_name="Название", max_length=32)

    class Meta:
        verbose_name = "Тип оплаты"
        verbose_name_plural = "Типы оплаты"


class DeliveryType(models.Model):
    name = models.CharField(verbose_name="Название", max_length=32)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип доставки"
        verbose_name_plural = "Типы доставки"


class Order(models.Model):
    ordered_date = models.DateTimeField(verbose_name="Дата создания заказа", auto_now_add=True)
    tracker_code = models.CharField(verbose_name="Код-треккер доставки", max_length=64, blank=True, null=True)
    user_id = models.ForeignKey(User, verbose_name="Пользователь", on_delete=models.PROTECT)
    delivery_type_id = models.ForeignKey("DeliveryType", verbose_name="Тип доставки", on_delete=models.PROTECT)
    payment_type_id = models.ForeignKey("PaymentType", verbose_name="Тип оплаты", on_delete=models.PROTECT)
    order_status_id = models.ForeignKey("OrderStatus", verbose_name="Статус заказа", on_delete=models.PROTECT)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"


class Basket(models.Model):
    quantity = models.IntegerField(verbose_name="Количество")
    price_to_order = models.DecimalField(verbose_name="Стоимость в момент заказа", max_digits=10, decimal_places=2)
    order_id = models.ForeignKey("Order", verbose_name="Заказ", on_delete=models.PROTECT)
    product_id = models.ForeignKey("Product", verbose_name="Товар", on_delete=models.PROTECT)

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"

