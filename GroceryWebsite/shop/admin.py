from django.contrib import admin

# Register your models here.

from . models import Categories,Products,Orders

admin.site.register(Categories)
admin.site.register(Products)
admin.site.register(Orders)
