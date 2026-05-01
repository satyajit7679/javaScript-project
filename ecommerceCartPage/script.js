// Run code only after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // 📌 DOM ELEMENT SELECTION
  // ==========================
  const productList = document.getElementById("product-list"); // container for all products
  const cartItems = document.getElementById("cart-items"); // container for cart items
  const emptyCart = document.getElementById("empty-cart"); // "cart is empty" message
  const cartTotal = document.getElementById("cart-total"); // total section
  const totalAmmount = document.getElementById("total-amount"); // total price display
  const checkoutBtn = document.getElementById("checkout-btn"); // checkout button
  const removeItemBtn = document.getElementById("removeItemBtn"); // (not used currently)

  // ==========================
  // 📌 PRODUCT DATA
  // ==========================
  const products = [
    { id: 1, name: "product 1", price: 44.99 },
    { id: 2, name: "product 2", price: 50.99 },
    { id: 3, name: "product 3", price: 30.99 },
    { id: 4, name: "product 4", price: 60.99 },
  ];

  // ==========================
  // 📌 LOAD CART FROM LOCAL STORAGE
  // ==========================
  // If data exists → parse it, else use empty array
  const cart = JSON.parse(localStorage.getItem("product")) || [];

  // ==========================
  // 📌 RENDER PRODUCTS LIST
  // ==========================
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // Display product name, price, and add button
    productDiv.innerHTML = `
      <span>${product.name} - ${product.price}</span>
      <button data-id=${product.id}>Add to cart</button>
    `;

    productList.appendChild(productDiv);
  });

  // ==========================
  // 📌 ADD TO CART (EVENT DELEGATION)
  // ==========================
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // Get product id from button
      const productId = parseInt(e.target.getAttribute("data-id"));

      // Find product from product array
      const product = products.find((p) => p.id === productId);
      console.log(product);

      // Add product to cart
      addToCart(product);
    }
  });

  // ==========================
  // 📌 ADD ITEM TO CART FUNCTION
  // ==========================
  function addToCart(product) {
    cart.push(product); // push product into cart array
    console.log(cart);

    saveCartItem(); // save updated cart to localStorage
    randarCart(); // update UI
  }

  // ==========================
  // 📌 SAVE CART TO LOCAL STORAGE
  // ==========================
  function saveCartItem() {
    localStorage.setItem("product", JSON.stringify(cart));
  }

  // ==========================
  // 📌 RENDER CART ITEMS
  // ==========================
  function randarCart() {
    cartItems.innerHTML = ""; // clear previous items
    let totalPrice = 0; // total price variable

    if (cart.length > 0) {
      // Show cart and hide empty message
      emptyCart.classList.add("hidden");
      cartTotal.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price; // add item price

        const cartDiv = document.createElement("div");

        // Display item + remove button
        cartDiv.innerHTML = `
            ${item.name} - ${item.price}
            <button class="remove-btn" data-index=${index}>Remove Item</button>
        `;

        cartItems.appendChild(cartDiv);

        // Update total amount
        totalAmmount.textContent = `${totalPrice}`;
      });

    } else {
      // Show empty cart message
      emptyCart.classList.remove("hidden");
      totalAmmount.textContent = `$0.00`;
    }
  }

  // ==========================
  // 📌 CHECKOUT FUNCTION
  // ==========================
  checkoutBtn.addEventListener("click", () => {
    cart.length = 0; // clear cart array
    alert("checkout sucessfully");

    randarCart(); // update UI
  });

  // ==========================
  // 📌 REMOVE ITEM FROM CART
  // ==========================
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {

      // Get index of item
      const index = e.target.getAttribute("data-index");

      // Remove item using splice
      cart.splice(index, 1);

      saveCartItem(); // update localStorage
      randarCart(); // re-render cart
    }
  });

  // ==========================
  // 📌 INITIAL RENDER
  // ==========================
  // This runs when page loads (important!)
  randarCart();

});