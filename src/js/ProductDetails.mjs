import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
    // Add debug and safer event binding
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      console.log("Add to Cart button found, adding listener");
      addToCartBtn.addEventListener("click", () => {
        this.addProductToCart();
        alert("Item added to cart!"); // Temporary feedback
      });
    } else {
      console.error("Add to Cart button not found!");
    }
  }

  addProductToCart() {
    try {
      const cartItems = getLocalStorage("so-cart") || [];
      console.log("Current cart before:", cartItems);
      
      cartItems.push(this.product);
      setLocalStorage("so-cart", cartItems);
      
      console.log("Current cart after:", getLocalStorage("so-cart"));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  renderProductDetails() {
    // Add null checks
    const product = this.product || {};
    
    // Update elements only if they exist
    setTextContent("h2", product.Brand?.Name);
    setTextContent("h3", product.NameWithoutBrand);
    
    const productImage = document.querySelector("#p-image");
    if (productImage) {
      productImage.src = product.Images?.PrimaryExtraLarge || product.Images?.PrimaryLarge || "";
      productImage.alt = product.NameWithoutBrand || "";
    }
    
    setTextContent("#productPrice", product.FinalPrice ? `$${product.FinalPrice.toFixed(2)}` : "");
    setTextContent("#productColor", product.Colors?.[0]?.ColorName);
    
    const descElement = document.querySelector("#productDesc");
    if (descElement && product.DescriptionHtmlSimple) {
      descElement.innerHTML = product.DescriptionHtmlSimple;
    }
    
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn && product.Id) {
      addToCartBtn.dataset.id = product.Id;
    }
  }
}

// Helper function
function setTextContent(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text || "";
}



