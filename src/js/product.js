import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Step 1: Retrieve cart items from localStorage
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Retrieved Cart Items (Before Update):", cartItems);

  // Step 2: Add the new product to the cart
  cartItems.push(product);
  console.log("Updated Cart Items (After Update):", cartItems);

  // Step 3: Save the updated cart back to localStorage
  setLocalStorage("so-cart", cartItems);
  console.log("Cart Items Saved to LocalStorage:", getLocalStorage("so-cart"));
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);