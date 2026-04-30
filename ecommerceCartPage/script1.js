document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalAmmount = document.getElementById("total-amount");
  const checkoutBtn = document.getElementById("checkout-btn");

  const products = [
    { id: 1, name: "product 1", price: 29.99 },
    { id: 2, name: "product 2", price: 54.0 },
    { id: 3, name: "pr  oduct 3", price: 40.5 },
    { id: 4, name: "product 4", price: 80.99 },
    { id: 5, name: "product 5", price: 49.0 },
  ];

  const cart = [];

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button data-id=${product.id}>Add to Cart</button>
        `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click",(e) => {
    if(e.target.tagName === "BUTTON"){
        const productId = parseInt(e.target.getAttribute("data-id"))
        const product = products.find(p => p.id === productId)
        console.log(product);
        addToCart(product)
    }
  })

  function addToCart(product){
    cart.push(product);
    randerCart()
  }

  function randerCart(){
    cartItems.innerHTML = "";

    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCart.classList.add("hidden");
      cartTotal.classList.remove("hidden");
      cart.forEach((item,index) => {
        totalPrice += item.price
        const cartItem = document.createElement("div")
        cartItem.innerHTML = `
            ${item.name} - ${item.price}
        `
        cartItems.appendChild(cartItem)
        totalAmmount.textContent = `${totalPrice}`
      })
    } else {
      emptyCart.classList.remove("hidden");
      //cartTotal.classList.add("hidden");
      totalAmmount.textContent = `$0.00`
    }

  }

  checkoutBtn.addEventListener("click",() => {
    cart.length = 0
    alert("checkout sucessfully")
    randerCart()
  })

});
