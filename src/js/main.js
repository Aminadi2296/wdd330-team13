import { loadHeaderFooter } from "./utils.mjs";
import { initializeProductListing } from "./product-listing.js";

// Load header and footer first
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadHeaderFooter();
    initializeProductListing(); // Initialize product listing after header/footer
  } catch (error) {
    console.error("Error loading templates or product listing:", error);
  }
});