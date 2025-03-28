import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}">
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors ? item.Colors[0].ColorName : ""}</p>
      <p class="cart-card__quantity">qty: ${item.Quantity}</p>
      <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
      <button class="cart-card__remove" data-id="${item.Id}">Remove</button>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElement, key = "so-cart") {
    this.listElement = listElement;
    this.key = key;
    this.cartItems = [];
  }

  async init() {
    this.cartItems = this.getCartItems();
    if (this.cartItems.length) {
      this.renderCartItems();
      this.addEventListeners();
    } else {
      this.showEmptyMessage();
    }
  }

  getCartItems() {
    const items = localStorage.getItem(this.key);
    return items ? JSON.parse(items) : [];
  }

  renderCartItems() {
    renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems);
    this.updateTotal();
  }

  updateTotal() {
    const total = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice * item.Quantity), 0);
    
    const totalElement = document.querySelector(".cart-total");
    if (totalElement) {
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  addEventListeners() {
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-card__remove")) {
        this.removeItem(e.target.dataset.id);
      }
    });
  }

  removeItem(id) {
    this.cartItems = this.cartItems.filter(item => item.Id !== id);
    localStorage.setItem(this.key, JSON.stringify(this.cartItems));
    if (this.cartItems.length) {
      this.renderCartItems();
    } else {
      this.showEmptyMessage();
    }
  }

  showEmptyMessage() {
    this.listElement.innerHTML = "<li>Your cart is empty</li>";
    this.updateTotal();
  }
}