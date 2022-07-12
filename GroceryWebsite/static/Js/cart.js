
window.onload = function(){
    
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

    var remove_btn = document.getElementsByClassName('item-remove');
    for(var i=0; i<sub_btn.length; i++){
        var button = remove_btn[i];
        button.addEventListener('click',RemoveBtn);
    }

    setTimeout(() => {
        UpdateMyCart();
    }, 1500);
  
    isCartEmpty();
    cart_input();
    items_found();
    menu_responsive();
}

function UpdateMyCart() {
    
    var cart_value = document.getElementById('cart-value');
    cart_value.innerText = localStorage.getItem('item_count');
    
    var cart = JSON.parse(localStorage.getItem('cart'));
    // console.log(cart);
    var myCart = JSON.parse(localStorage.getItem('myCart'));
    // console.log(myCart);
    
    var cart_items = document.getElementById('cart-items'); 
    if(cart_items != null){
        cart_items.innerHTML = '';
    }

    var total_price = 0;

    var last_prod;
    for(var item in myCart){
        last_prod = parseInt(item.slice(7,10));
    }
    for(var i=1;i<last_prod+1;i++){
        if(myCart['product'+i] != undefined){
            var image = myCart['product'+i][0];
            var item_name = myCart['product'+i][1];
            var desc = myCart['product'+i][2];
            var quantity = myCart['product'+i][3];
            var price = myCart['product'+i][4];
            
            item_name = item_name.substring(7,100);
            desc = desc.substring(13,200);
            price = price.substring(7,14);
        
            var cart_items = document.getElementById('cart-items'); 
            var cart_child = document.createElement('div');
            cart_child.className = 'cart-item';
            cart_child.id = 'cart-item';
            if(cart_items != null){
                cart_items.appendChild(cart_child);
            }
        
            if(String(quantity).substring(0,3) > 0){
                // console.log(String(quantity).substring(0,3));

                var element = ` <div class="item-image"><img src="${image}" width="120px" height="120px" alt="img" /></div>
                                <div class="item-name-desc">
                                    <div class="item-name"><b>${item_name}</b></div>
                                    <div class="item-desc">${desc}</div>
                                </div>
                                <div class="quantity">
                                    <div class="add-sub-btn">
                                            <div class="sub-btn"> - </div> 
                                            <div class="val-btn"> ${quantity} </div> 
                                            <div class="add-btn"> + </div> 
                                    </div>
                                </div>
                                <div class="item-price"><b>${price}</b></div>
                                <div class="item-remove" id="item-remove"> <button type="submit"> Remove</button> </div>` ;

                cart_child.innerHTML = element;
            }
            
            var quan = (String(quantity).substring(0,3));
            var pr = String(price).substring(2,8);
            total_price = total_price + (parseInt(quan) * parseInt(pr));
            
        // }
        }
    }

    var items_total_price = document.getElementById('items-total-price');
    if(items_total_price != null){
        items_total_price.innerText = total_price; 
    }

    var delivery_charge = document.getElementById('delivery-charge');
    if(delivery_charge != null){
        delivery_charge.innerText = 0;
    }

    var total_cost_price = document.getElementById('total-cost-price');
    if(total_cost_price != null){
        total_cost_price.innerText = total_price;
    }

    var no_of_items = document.getElementById('no-of-items');
    if(no_of_items != null){
        no_of_items.innerText = parseInt(localStorage.getItem('item_count'));
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

    var remove_btn = document.getElementsByClassName('item-remove');
    for(var i=0; i<sub_btn.length; i++){
        var button = remove_btn[i];
        button.addEventListener('click',RemoveBtn);
    }

    isCartEmpty();
    cart_input();
}

function AddQuantity(event) {

    var myCart = JSON.parse(localStorage.getItem('myCart'));
    var button = event.target;
    var element = button.previousSibling.previousSibling;
    var name = button.parentElement.parentElement.previousSibling.previousSibling.firstChild.nextSibling.innerText;
    // console.log(button,element,name);

    var cart = JSON.parse(localStorage.getItem('cart'));
    var myCart = JSON.parse(localStorage.getItem('myCart'));
    // console.log(myCart);

    element.innerText = parseInt(element.innerText) + 1;
    // console.log(element.innerText);

    cart["Name : " + name] = parseInt(cart["Name : " + name]) + 1;
    // console.log(cart["Name : " + name]);
    localStorage.setItem('cart',JSON.stringify(cart));

    var count = parseInt(myCart['count']);
    // console.log(count);

    var last_prod;
    for(var item in myCart){
        last_prod = parseInt(item.slice(7,10));
    }

    for(var i=1;i<last_prod+1;i++){
        if(myCart['product'+i] != undefined){
            if (('Name : ' + name) == myCart['product'+i][1]) {
                // console.log('previous : ',myCart['product'+i][3]," ","Next : ",myCart['product'+i][3]+1);
                myCart['product'+i][3] = myCart['product'+i][3] + 1 ;
                // console.log(myCart['product'+i][1],"  ", myCart['product'+i][3])
            }
        }
    }
    localStorage.setItem('myCart',JSON.stringify(myCart));

    item_count = parseInt(localStorage.getItem('item_count'));
    item_count = item_count + 1;
    // console.log(item_count);
    localStorage.setItem('item_count',item_count);

    var cart_value = document.getElementById('cart-value');
    cart_value.innerText = localStorage.getItem('item_count');

    var no_of_items = document.getElementById('no-of-items');
    no_of_items.innerText = parseInt(localStorage.getItem('item_count'));

    UpdateMyCart();

}


function SubQuantity(event) {

    var myCart = JSON.parse(localStorage.getItem('myCart'));
    var button = event.target;
    var element = button.nextSibling.nextSibling;
    var name = button.parentElement.parentElement.previousSibling.previousSibling.firstChild.nextSibling.innerText;

    if (element.innerText > 1 ) {
        element.innerText = parseInt(element.innerText) - 1;        
    }

    var cart = JSON.parse(localStorage.getItem('cart'));
    var myCart = JSON.parse(localStorage.getItem('myCart'));

    // console.log(name);
    console.log(cart["Name : " + name]);
    if (cart["Name : " + name] > 1 ) {
        cart["Name : " + name] = cart["Name : " + name] - 1;

        var last_prod;
        for(var item in myCart){
            last_prod = parseInt(item.slice(7,10));
        }

        for(var i=1;i<last_prod+1;i++){
            if(myCart['product'+i] != undefined){
                if (('Name : ' + name) == myCart['product'+i][1]) {
                    myCart['product'+i][3] = myCart['product'+i][3] - 1 ;
                    // console.log(myCart['product'+i][1],"  ", myCart['product'+i][3])
                }
            }
        }
        
        // console.log(cart[name.innerText]);
        localStorage.setItem('cart',JSON.stringify(cart));
        localStorage.setItem('myCart',JSON.stringify(myCart));
        
        var item_count = parseInt(localStorage.getItem('item_count'));
        item_count = item_count - 1;
        // console.log(item_count);
        localStorage.setItem('item_count',item_count);
    
        var cart_value = document.getElementById('cart-value');
        cart_value.innerText = localStorage.getItem('item_count');
    }        

    
    var no_of_items = document.getElementById('no-of-items');
    no_of_items.innerText = parseInt(localStorage.getItem('item_count'));

    UpdateMyCart();
    
}

//now want to make loop of myCart and if name match with any item then remove that item from myCart and from cart also
function RemoveBtn(event){
    var button = event.target;
    var name = button.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.nextSibling.innerText;
    // console.log(button,name);

    var cart = JSON.parse(localStorage.getItem('cart'));
    var myCart = JSON.parse(localStorage.getItem('myCart'));
  
    for(var item in cart){
        if(cart[item] != undefined){
            if(item == 'Name : '+name){
                // console.log(item)
                delete cart[item];
            }
        }
    }
    localStorage.setItem('cart',JSON.stringify(cart));

    var count = parseInt(myCart['count']);
    count = count - 1;
    myCart['count']=count;
    localStorage.setItem('myCart',JSON.stringify(myCart));
    // console.log(count);

    var last_prod;
    for(var item in myCart){
        last_prod = parseInt(item.slice(7,10));
    }
    
    for(var i=1;i<last_prod+1;i++){
        if(myCart['product'+i] !=undefined){
            if(('Name : ' + name ) == (myCart['product'+i][1])){
                // console.log('item : ',item);

                var item_quantity = myCart['product'+i][3];
                item_count = parseInt(localStorage.getItem('item_count'));
                item_count = item_count - item_quantity;
                localStorage.setItem('item_count',item_count);
            
                var cart_value = document.getElementById('cart-value');
                cart_value.innerText = localStorage.getItem('item_count');

                delete myCart['product'+i];

            
            }
        }
    }
    localStorage.setItem('myCart',JSON.stringify(myCart));

    UpdateMyCart();   // since to load the new myCart and update the price and count also

    // console.log(cart);
    // console.log(myCart);
}

var i=1;
function isCartEmpty() {
    var myCart = JSON.parse(localStorage.getItem('myCart'));
    if(myCart['count'] == 0){

        var cart_items = document.getElementById('cart-items'); 
        if(cart_items != null){
            cart_items.innerHTML = '<h3>Your cart is empty !! </h3>' + '<br><br>' + '<a href="javascript:history.go(-1)">Add items</a>';    
        }

        var cart_value = document.getElementById('cart-value');
        cart_value.innerText = '0';

        var no_of_items = document.getElementById('no-of-items');
        if(no_of_items != null){
            no_of_items.innerText = '0';
        }
    
        var add_more_items = document.getElementsByClassName('add-more-items')[0];
        if(add_more_items != null){
            add_more_items.innerHTML = " ";
        }

        var proceed_to_checkout = document.getElementById('checkout-btn');
        if(proceed_to_checkout != null){
            proceed_to_checkout.addEventListener('click',add_item_notification);
        }

        function add_item_notification(e) {
            e.preventDefault();
            var summary_box = document.getElementsByClassName('summary-box')[0];
            if(summary_box != null){
                var notify = document.createElement('div');
                notify.className = 'notify';
                notify.id = 'notify';
                notify.innerText = ' * Please add the products to proceed. '
                if(i==1){
                    summary_box.appendChild(notify);
                }
                i=i+1;
            }
        }
    }
}

function cart_input(){
    var myCart = JSON.stringify(localStorage.getItem('myCart'));
    
    var items_Json = document.getElementById('items-Json');
    if(items_Json!=null){
        items_Json.value = myCart;
    }

    var var_id = document.getElementById('variable-id');
    var thanks = document.getElementById('variable-thanks');

    if(var_id!=null && thanks!=null){
        if(thanks.value == 'True'){
            alert(`Thanks for odering.\nYour order is successfully submited, your can track your order using order ID = ${var_id.value}`)
            localStorage.clear();
            window.location = '/shop';
        }
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
