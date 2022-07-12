from email.policy import default
from pyexpat import model
from django.db import models
from numpy import product

# Create your models here.

class Categories(models.Model):
    cat_ID = models.AutoField(primary_key=True)
    cat_name = models.CharField(max_length=30)
    cat_image = models.ImageField(upload_to = 'shop/images',default="")

    def __str__(self):
        return self.cat_name


class Products(models.Model):
    product_ID = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=50)
    product_category = models.CharField(max_length=50)
    product_image = models.ImageField(upload_to = 'shop/images',default="")
    product_desc = models.CharField(max_length=400)
    product_quantity = models.CharField(max_length=50)
    product_price = models.IntegerField(default=0)

    def __str__(self):
        return self.product_name


class Orders(models.Model):
    order_id = models.AutoField(primary_key=True)
    items_Json = models.CharField(max_length=5000,default="")
    name = models.CharField(max_length=100,default="")
    email = models.CharField(max_length=100,default="")
    address = models.CharField(max_length=500,default="")
    city = models.CharField(max_length=100,default="")
    state = models.CharField(max_length=100,default="")
    zip_code = models.IntegerField(default="")
    phone = models.IntegerField(default="")



# admin:

# username : kaifmirza
# password : kaif1234
# email : mirzakaif21@gmail.com