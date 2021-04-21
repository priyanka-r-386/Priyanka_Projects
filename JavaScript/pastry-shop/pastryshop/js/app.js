

const cartTotal=document.querySelector(".cart-total")
const productsDom = document.querySelector(".store-items");
const cartAll = document.querySelector(".cart");
//const cartContent = document.querySelector(".container-fluid")
const totalItem = document.querySelector('.item-count');
const totalAmount = document.querySelector('.item-total');
const cartContent=document.querySelector('.carts')
const closeCart = document.querySelector('.close-cart');
const shoppingCart = document.querySelector('.fa-shopping-cart')
const removeItem = document.querySelector('.remove-item');
const sortButtonCake = document.querySelector('.btn-info-cake');
const sortButtonDonut = document.querySelector('.btn-info-donut');
const sortButtonCupcake = document.querySelector('.btn-info-cupcake');
const sortButtonAll = document.querySelector('.btn-info-all');

const client = contentful.createClient({
    space: "mirpnwst5538",
    accessToken: "ShWQfEjpsXPSC4GBDka__uIMc46XJoy0mIH4weE2pn8"
});

let cart = [];
let buttonsDom = [];
let sortCart=[]

class Products{
    //get products from contentful
    async getProducts() {
            try {
            const contentful= await client.getEntries({content_type:"pastryShop"})
            let products = contentful.items;
                products = products.map(item => {
                const { name, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                const { sortType }=item.fields
                return {name,price,id,image,sortType}
            })
            return products
        } catch (error) {
            console.log(error);
        }
    }

}

class UI{
    //display products
    displayProducts(products) {
    let result = '';
    products.forEach(product => {
    result +=
    `<div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item sweets" data-item="cake">
        <div class="card single-item">
            <div class="img-container">
                <img src=${product.image} alt="cake1" class="card-img-top store-img">
                <button class="store-item-icon" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
            <div class="card-body">
                <div class="card-text d-flex justify-content-between text-capitalize">
                    <h5 id="store-item-name">${product.name}</h5>
                    <h5 class="store-item-value">$ <strong class="banner-title">${product.price}</strong></h5>
                </div>
            </div>
        </div>
    </div>`
        });
        productsDom.innerHTML = result;
    }

    getBagBtn(products) {
        const btn = [...document.querySelectorAll(".store-item-icon")];
        buttonsDom = btn;
        btn.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id)
            if (inCart) {
                button.disabled = true;
            }
            else
                button.addEventListener('click', (event) => {
                    event.target.disabled = true;
                    this.showCard()
                    let cartItem = { ...this.getProduct(products,id), amount: 1 }
                    cart = [...cart, cartItem]
                    //set cart values
                    this.setCartValues(cart);
                    //add cart items
                    this.addCartItem(cartItem);
                })
        })
    }
     setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal+=item.amount
        })
         cartTotal.innerText = parseInt(tempTotal.toFixed(2))
         totalItem.innerText = parseInt(itemsTotal);
         totalAmount.innerText=parseInt(tempTotal.toFixed(2))
     }
    //get productsby matching Id
    getProduct(products,id) {
        return products.find(prod=>prod.id===id)
    }
    //Get products by matching name 
    getProductName(products,name) {
        return products.filter(prod=>prod.sortType===name)
    }
    //add items to cart
    addCartItem(item) {
        let div = document.createElement('div')
        div.classList.add('single-cart-item');
        div.innerHTML=`
         <div class="cart-item d-flex justify-content-between text-capitalize my-3">
           <img src=${item.image} class="img-fluid rounded-circle" height=60px width=50px alt="product">
                <div class="cart-item-title">
                <h4 class="cart-title-text text-capitalize ">${item.name}</h4><span class="cake-price">$:${item.price}</span>
                </div>
                <span class="remove-item" >
                            <i class="fas fa-trash-alt" data-id=${item.id}></i>
                </span>
              <div>
           `
        cartContent.appendChild(div);
    }
    hideCard(){
    cartAll.style.visibility="hidden"
    }
    showCard() {
        cartAll.style.visibility="visible"
    }
    setUpCart() {
        closeCart.addEventListener('click', this.hideCard)
        shoppingCart.addEventListener('click', this.showCard)
    }
    removeCartItem(id) {
        cart = cart.filter(item =>  item.id !== id);
        this.setCartValues(cart);
        this.getProduct(cart,id)
    }
    deleteCartItems() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeCartItem(id));
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCard();
    }
    cartLogic() {
        cartAll.addEventListener('click', event => {
                if (event.target.classList.contains('fas')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                this.removeCartItem(id)
                cartContent.removeChild(removeItem.parentElement.parentElement.parentElement)
            }
            if (event.target.classList.contains('btn-pink')) {
                this.deleteCartItems()
            }
        })
    }
     storeLogic(product) {
        sortButtonCake.addEventListener('click', event => {
            let name = event.target.dataset.filter;
            let sortProduct = this.getProductName(product, name) 
            this.displayProducts(sortProduct)
            this.getBagBtn(sortProduct)

        })
        sortButtonCupcake.addEventListener('click', event => {
            let name = event.target.dataset.filter;
            let sortProduct = this.getProductName(product, name) 
            this.displayProducts(sortProduct)
            this.getBagBtn(sortProduct)
        })
        sortButtonDonut.addEventListener('click', event => {
            let name = event.target.dataset.filter;
            let sortProduct = this.getProductName(product, name) 
            this.displayProducts(sortProduct)
            this.getBagBtn(sortProduct)
        })
         sortButtonAll.addEventListener('click', event => {
             this.displayProducts(product)
             this.getBagBtn(product)
            })
    }
    
    }


document.addEventListener("DOMContentLoaded", () => {
    const product = new Products();
    const ui = new UI();
    ui.setUpCart()
    product.getProducts().then(product => {
        ui.displayProducts(product)
        ui.storeLogic(product)
        ui.getBagBtn(product)
        
    }).then(() => {
        //ui.getBagBtn(product)
        ui.cartLogic()
       
    })
})