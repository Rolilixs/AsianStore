from django.contrib import admin
from .models import *


class ProductImageInline(admin.TabularInline):
    fk_name = "product_id"
    model = ProductImage
    verbose_name = "Изображение"
    verbose_name_plural = "Дополнительные изображения"


class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "count_in_stock", "category_id")
    readonly_fields = ("main_image_preview",)
    inlines = (ProductImageInline,)

    def main_image_preview(self, obj):
        return mark_safe(f'<img src="{obj.main_image.url}" height=200px/>')

    main_image_preview.short_description = "Главное изображение (превью)"


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


class OrderStatusAdmin(admin.ModelAdmin):
    list_display = ("name",)


class PaymentTypeAdmin(admin.ModelAdmin):
    list_display = ("name",)


class DeliveryTypeAdmin(admin.ModelAdmin):
    list_display = ("name",)


class OrderAdmin(admin.ModelAdmin):
    list_display = ("user_id", "order_status_id", "delivery_type_id", "payment_type_id", "order_status_id")


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(OrderStatus, OrderStatusAdmin)
admin.site.register(PaymentType, PaymentTypeAdmin)
admin.site.register(DeliveryType, DeliveryTypeAdmin)
admin.site.register(Order, OrderAdmin)
