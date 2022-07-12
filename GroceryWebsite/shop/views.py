from math import prod
from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
from numpy import product
from shop.models import Categories,Products,Orders
import random

# Create your views here.
def index(request):
    categories = Categories.objects.all()
    products = Products.objects.all()

    dict = {}
    for i in categories:
        dict[i]=[]

        products_shuffle = []
        while True:
            shuffle_product = random.choice(products)
            if shuffle_product not in products_shuffle:
                products_shuffle.append(shuffle_product)

            if(len(products_shuffle) == len(products)):
                break   

        for j in products_shuffle:
            if i.cat_name == j.product_category:
                if(len(dict[i]) <6 ):
                    dict[i].append(j)

    dict2 = {'categories':categories,'products':products,'dict':dict}

    return render(request,'shop/index.html',dict2)

def search(request):
    search = request.GET.get('search')

    if search != '' :
        mySet = {}
        products = Products.objects.all()
        for i in products:
            i = str(i)
            if search.lower() in i.lower():
                product = Products.objects.filter(product_name = i)
                mySet[i] = product
            
    else:
        mySet = {}

    items_found = len(mySet)    
    return render(request,'shop/search.html',{'search_prods' : mySet,'items_found': items_found,'search' : search })


def ProductView (request,id):
    category = Categories.objects.all()
    products = Products.objects.all()

    product = products.filter(product_ID=id)
    more_items = products.filter(product_category = product[0].product_category )
    prod_category = category.filter(cat_name = product[0].product_category)

    more_items_shuffle = []
    while True:
        more_item = random.choice(more_items)
        if more_item not in more_items_shuffle:
            # if more_item != product[0]:
                more_items_shuffle.append(more_item)

        if(len(more_items) == len(more_items_shuffle)):
            break   

    more_items_shuffle.remove(product[0])
    return render(request,'shop/product.html',{'product': product[0],'more_items':more_items_shuffle,'prod_category':prod_category[0]})
    # since the filter is providing a list of a element that is matching with ID, so we have to use brackets



def Category(request,id):
    categories = Categories.objects.all()
    products = Products.objects.all()
    category = categories.filter(cat_ID=id)
    category_products = products.filter(product_category = category[0].cat_name )

    return render(request,'shop/categories.html',{'category_products':category_products,'category':category[0]})
    

def Cart(request):
    return render(request,'shop/cart.html')


def Checkout(request):
    if request.method == 'POST':
        itemsJSON = request.POST.get('itemsJSON','')
        name = request.POST.get('name','')
        email = request.POST.get('email','')
        address = request.POST.get('address','')
        city = request.POST.get('city','')
        state = request.POST.get('state','')
        zip_code = request.POST.get('zip','')
        phone = request.POST.get('number','')

        order = Orders(items_Json=itemsJSON, name=name, email=email, address=address, city=city, state=state, zip_code=zip_code,phone=phone)
        order.save()

        id = order.order_id
        thanks =True
        return render(request,'shop/checkout.html',{'thanks':thanks,'id':id})
    return render(request,'shop/checkout.html')