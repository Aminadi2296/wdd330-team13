import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add this right after rendering cart items
  if (cartItems && cartItems.length > 0) {
    const total = calculateCartTotal(cartItems);
    document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
    document.querySelector(".cart-footer").classList.remove("hide");
  } else {
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

// Keep your existing template function
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Add this simple helper function at the bottom
function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + parseFloat(item.FinalPrice), 0);
}

renderCartContents();