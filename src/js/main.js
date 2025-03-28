import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";


// Load header and footer first
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load header and footer templates
    await loadHeaderFooter();
    
    // Then initialize the product list
    const dataSource = new ProductData("tents");
    const element = document.querySelector(".product-list");
    const productList = new ProductList("Tents", dataSource, element);
    
    productList.init();
  } catch (error) {
    console.error("Error loading header/footer or initializing product list:", error);
  }
});