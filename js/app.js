document.addEventListener("DOMContentLoaded", function () {

  // setup products page (only runs if products elements exist)
  if (typeof setupProductsPage === "function") {
    setupProductsPage();
  }

  // setup contact page (only runs if contact form exists)
  if (typeof setupContactForm === "function") {
    setupContactForm();
  }
});
