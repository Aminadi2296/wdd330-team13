import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  if (cartItems.length > 0) setupRemoveButtons();

  if (cartItems && cartItems.length > 0) {
    const total = calculateCartTotal(cartItems);
    document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
    document.querySelector(".cart-footer").classList.remove("hide");
  } else {
    document.querySelector(".cart-footer").classList.add("hide");
  }
}


function setupRemoveButtons() {
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const cartItems = getLocalStorage("so-cart").filter(item => item.Id !== id);
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });
  });
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider" style="position:relative">
    <!-- Added this X button -->
    <span class="remove-item" data-id="${item.Id}" style="
      position:absolute;
      right:10px;
      top:10px;
      cursor:pointer;
      font-size:1.2rem;
      z-index:1;
    ">❌</span>
    
    <!-- Your existing template below -->
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}">
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + parseFloat(item.FinalPrice), 0);
}

renderCartContents();