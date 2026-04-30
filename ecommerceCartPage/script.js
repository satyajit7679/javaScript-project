document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalAmmount = document.getElementById("total-amount");
  const checkoutBtn = document.getElementById("checkout-btn");
  const removeItemBtn = document.getElementById("removeItemBtn")

  const products = [
    { id: 1, name: "product 1", price: 44.99 },
    { id: 2, name: "product 2", price: 50.99 },
    { id: 3, name: "product 3", price: 30.99 },
    { id: 4, name: "product 4", price: 60.99 },
  ];

  const cart = []

  products.forEach(product =>{
    const productDiv = document.createElement("div")
    productDiv.classList.add("product")
    productDiv.innerHTML = `
      <span>${product.name} - ${product.price}</span>
      <button data-id=${product.id}>Add to cart</button>
    `
    productList.appendChild(productDiv)
  })

  productList.addEventListener("click",(e) =>{
    if(e.target.tagName === "BUTTON"){
      const productId = parseInt(e.target.getAttribute("data-id"))
      const product = products.find(p => p.id === productId)
      console.log(product);
      
      addToCart(product)
    }  
  })

  function addToCart(product){
    cart.push(product)
    console.log(cart);
    randarCart()
  }

  

  function randarCart(){
    cartItems.innerHTML = ""
    let totalPrice = 0

    if(cart.length > 0){
      emptyCart.classList.add("hidden")
      cartTotal.classList.remove("hidden")
      cart.forEach((item,index) => {
      totalPrice += item.price
      const cartDiv = document.createElement("div")
      cartDiv.innerHTML = `
            ${item.name} - ${item.price}
            <button class="remove-btn" data-index=${index}>Remove Item</button>
        `
        cartItems.appendChild(cartDiv)
        totalAmmount.textContent = `${totalPrice}`    
      })
      

    }else{
      emptyCart.classList.remove("hidden")
      totalAmmount.textContent = `$0.00`
    }
  }

  

  checkoutBtn.addEventListener("click",() => {
    cart.length = 0
    alert("checkout sucessfully")
    randarCart()
  })

  cartItems.addEventListener("click",(e) =>{
    if(e.target.classList.contains("remove-btn")){
      const index = e.target.getAttribute("data-index");
      cart.splice(index,1)
      randarCart()
    }
  })

  

});
