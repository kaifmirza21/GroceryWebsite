
if(localStorage.getItem('cart')  == null){
    var cart = {};
}
else{
    cart = JSON.parse(localStorage.getItem('cart'));
           
    setTimeout(() => {
        var cart_value = document.getElementById('cart-value');
        cart_value.innerText = localStorage.getItem('item_count');
    }, 1000);
}

if(localStorage.getItem('myCart')  == null){
    var myCart = {};
}
else{
    myCart = JSON.parse(localStorage.getItem('myCart'));
}

// if we don't add eventlistner in all the buttons after loading the page then it will not update the 
// buttons that are changed from add to cart to add & sub quantity buttons.
window.onload=function(){

    var AddToCartBtn = document.getElementsByClassName('add-to-cart-btn');
    for(var i=0; i<AddToCartBtn.length; i++){
        var button = AddToCartBtn[i];
        button.addEventListener('click',addToCart);
    }   

    var add_btn = document.getElementsByClassName('add-btn');
    for(var i=0; i<add_btn.length; i++){
        var button = add_btn[i];
        button.addEventListener('click',AddQuantity);
    }  
    var sub_btn = document.getElementsByClassName('sub-btn');
    for(var i=0; i<sub_btn.length; i++){
        var button = sub_btn[i];
        button.addEventListener('click',SubQuantity);
    }   
    var cart_btn = document.getElementById('cart');
    cart_btn.addEventListener('click',CartLocation);

    UpdateCart();
    MyCart();
    items_found() ;
    menu_responsive();
} 

function addToCart(event) {
    var button = event.target;
    var clicked_item = button.parentElement.parentElement.parentElement;

    var name = clicked_item.getElementsByClassName('product-name')[0].innerText;
    
    if (cart[name] == undefined) {
        cart[name] = 1;
    }
    else{
        cart[name] = cart[name] + 1;
    }
    localStorage.setItem('cart',JSON.stringify(cart));

    var item_count = localStorage.getItem('item_count')
    if (item_count == null) {
        item_count = 0
    }
    else{
        item_count = parseInt(localStorage.getItem('item_count'))
    }
    
    var lst = cart;
    for (var [key,value] of Object.entries(lst)) {
        if (name == key) {
            if (value > 1) {
                value = 1;
                item_count = item_count + value;
            }
            else{
                item_count = item_count + value;
            }
        }
    }
    // console.log(item_count);
    localStorage.setItem('item_count',item_count);
    
    setTimeout(() => {
        var cart_value = document.getElementById('cart-value');
        cart_value.innerText = localStorage.getItem('item_count');
    }, 500);

    UpdateCart();
    MyCart();

}


// function to change the UI of AddToCartBtn into addQuantity and subQuantity
function UpdateCart(){

    for(var item in cart ){
        if(cart[item]!=undefined){
            var btn = document.getElementById(`productNo${item}`);
            if(btn != null && cart[item] != 0){
                btn.innerHTML = `<div class="add-sub-btn">
                                    <div class="sub-btn"> - </div> 
                                    <div class="val-btn"> ${cart[item]} </div> 
                                    <div class="add-btn"> + </div> 
                                </div>` 
            }
        }
    }
    // if we not add this code then we have to reload the page first, then we will able to addQuantity
    // therefore to avoid the problem of reload again and again we write the same code here just after updating the cart.

    var AddToCartBtn = document.getElementsByClassName('add-to-cart-btn');
    for(var i=0; i<AddToCartBtn.length; i++){
        var button = AddToCartBtn[i];
        button.addEventListener('click',addToCart);
    }   

    var add_btn = document.getElementsByClassName('add-btn');
    for(var i=0; i<add_btn.length; i++){
        var button = add_btn[i];
        button.addEventListener('click',AddQuantity);
    }  
 
    var sub_btn = document.getElementsByClassName('sub-btn');
    for(var i=0; i<sub_btn.length; i++){
        var button = sub_btn[i];
        button.addEventListener('click',SubQuantity);
    } 
    var cart_btn = document.getElementById('cart');
    cart_btn.addEventListener('click',CartLocation);

    MyCart();
}


function AddQuantity(event) {

    var button = event.target;
    var element = button.previousSibling.previousSibling;
    var name = button.parentElement.parentElement.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;

    element.innerText = parseInt(element.innerText) + 1;
    cart[name.innerText] = cart[name.innerText] + 1;
    // console.log(cart[name.innerText]);
    localStorage.setItem('cart',JSON.stringify(cart));

    item_count = parseInt(localStorage.getItem('item_count'));
    item_count = item_count + 1;
    // console.log(item_count);
    localStorage.setItem('item_count',item_count);

    var cart_value = document.getElementById('cart-value');
    cart_value.innerText = localStorage.getItem('item_count');

    MyCart();

}


function SubQuantity(event) {

    var button = event.target;
    var element = button.nextSibling.nextSibling;
    var name = button.parentElement.parentElement.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;

    if (element.innerText > 1 ) {
        element.innerText = parseInt(element.innerText) - 1;        
    }
    else if (element.innerText == 1 ){
        var item = button.parentElement.parentElement;
        item.innerHTML = `<button type="submit" class="add-to-cart-btn">Add to Cart</button>`; 

        var AddToCartBtn = document.getElementsByClassName('add-to-cart-btn');
        for(var i=0; i<AddToCartBtn.length; i++){
            var button = AddToCartBtn[i];
            button.addEventListener('click',addToCart);
        } 
    }
    if (cart[name.innerText] > 0 ) {
                cart[name.innerText] = cart[name.innerText] - 1;
                // console.log(cart[name.innerText]);
                localStorage.setItem('cart',JSON.stringify(cart));
                
                item_count = parseInt(localStorage.getItem('item_count'));
                item_count = item_count - 1;
                // console.log(item_count);
                localStorage.setItem('item_count',item_count);
            
                var cart_value = document.getElementById('cart-value');
                cart_value.innerText = localStorage.getItem('item_count');
    }        

    MyCart();
}

function MyCart(){

    // var cart = JSON.parse(localStorage.getItem('cart'));
    // var myCart = JSON.parse(localStorage.getItem('myCart'));

    var i=1;
    for(var item in cart ){
        i=i+1;
    }
    var count = i-1;
    // if(myCart != null){
        myCart['count'] = count;
        localStorage.setItem('myCart',JSON.stringify(myCart));
    // }

    var i = 1 ;
    for(var item in cart ){
    // for(i;i<count+1;i++){
        // console.log('Entered in loop');
        if(cart[item]!=undefined){
            var product = window.document.getElementById('product'+`${item}`);

            if(product != undefined){
                var image = product.getElementsByClassName('product-image')[0];

                if(image!=undefined){
                    var image_url = image.getElementsByTagName('img')[0].getAttribute('src');
                }

                var name = product.getElementsByClassName('product-name')[0].innerText;
                var desc = product.getElementsByClassName('product-desc')[0].innerText;
                var quantity = cart[item];
                var price = product.getElementsByClassName('product-price')[0].innerText;

                var product = [image_url,name,desc,quantity,price];
                myCart['product'+i] = product;
                // console.log(myCart['product'+i]);
                localStorage.setItem('myCart',JSON.stringify(myCart));
                // console.log('myCart updated');

            }
        }
        i=i+1;
    }

}


function CartLocation(){
    var urls = [];
    for(var i = document.links.length; i --> 0;)
        if(document.links[i].hostname === location.hostname)
            urls.push(document.links[i].href);

    var url = urls[urls.length -1];
    // console.log(url);
    if (url == 'http://127.0.0.1:8000/shop/#') {
        window.location.href = 'http://127.0.0.1:8000/shop/cart' ;
    } 
    else {
        window.history.go(-1);
        window.location.href = 'http://127.0.0.1:8000/shop/cart' ;
    }
}

function items_found() {
    var items_found = document.getElementById('items-found');
    if(items_found != undefined){
        if(items_found.innerText == '0 items found'){
            items_found.innerText = 'Sorry, no related products found !!!'
        }
    }
}

function menu_responsive() {
    var menu_box = document.getElementById('menu-box');
    var search = document.getElementById('search');
    if(menu_box != undefined){
        menu_box.addEventListener('click',menu_response);
        search.addEventListener('click',menu_response);
    }
}

function menu_response() {
    var nav_right = document.getElementsByClassName('nav-right')[0];
    if (nav_right.style.display == 'none') {
        nav_right.style.display = 'block';
    } else {
        nav_right.style.display = 'none';
    }
}
