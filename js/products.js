function setupProductsPage() {

  //gets the products Container element from the html
  var productsContainer = document.getElementById("products-list");

  //if not or empty product container return nothing
  if (!productsContainer) {
    return;
  }

  //get elements from the html
  var messageElement = document.getElementById("products-message");
  var categorySelect = document.getElementById("filter-category");
  var sortSelect = document.getElementById("sort-price");
  var applyButton = document.getElementById("apply-filters");
  var resetButton = document.getElementById("reset-filters");

  //store the products in a new array 
  var allProducts = [];

  //load the json file and handles errors
  fetch("data/products.json")
    .then(function (response) {
      // handle bad http status
      if (!response.ok) {
        throw new Error("Bad response");
      }
      return response.json();
    })
    .then(function (data) {

      // validate the products before using them
      var valid = [];
      var invalidCount = 0;

      // loop through the data
      for (var i = 0; i < data.length; i++) {
        if (validateProduct(data[i])) {
          valid.push(data[i]);
        } else {
          invalidCount++;
        }
      }

      // store only valid products
      allProducts = valid;

      // show message if something failed validation
      if (messageElement) {
        if (invalidCount > 0) {
          messageElement.textContent = "Some products failed validation and were skipped.";
          messageElement.className = "info-text error";
        } else {
          messageElement.textContent = "";
          messageElement.className = "info-text";
        }
      }

      // display products
      showProducts(allProducts, productsContainer, messageElement);

      // run tests and log results (PASS/FAIL)
      var testResults = runProductTests(allProducts);
      logTestResults(testResults);

    })
    .catch(function () {
      if (messageElement) {
        messageElement.textContent = "Could not load products.";
        messageElement.className = "info-text error";
      }
    });

  //apply button to apply filter configurations //if applybutton exits continue
  if (applyButton) {
    //when clicking apply:
    applyButton.addEventListener("click", function () {
      //if categorySelect exists, use its value, otherwise default to "all"
      var category = categorySelect ? categorySelect.value : "all";
      //if sortSelect exists, use its value, otherwise default to "none"
      var sortType = sortSelect ? sortSelect.value : "none";

      // create a copy of the array so dont have to change the original
      var list = allProducts.slice();

      // if category not equal to "all"(specific selected)
      if (category !== "all") {
        //filter the list to only items in that category
        list = list.filter(function (item) {
          // keep the items that match the category
          return item.category === category;
        });
      }

      //if sorting low to high 
      if (sortType === "low-high") {
        //sort list by ascending price
        list.sort(function (a, b) {
          //smaller prices first
          return a.price - b.price;
        });
        //if sorting high to low
      } else if (sortType === "high-low") {
        //sort list by descending price
        list.sort(function (a, b) {
          //bigger prices first
          return b.price - a.price;
        });
      }

      //display the filtered products
      showProducts(list, productsContainer, messageElement);
    });
  }

  //if resetButton exists do:
  if (resetButton) {
    //when click:
    resetButton.addEventListener("click", function () {
      //if categorySelect exists 
      if (categorySelect) {
        //set value to all
        categorySelect.value = "all";
      }
      // if sortSelect exists
      if (sortSelect) {
        // set value to none
        sortSelect.value = "none";
      }
      //show all the products in them original position 
      showProducts(allProducts, productsContainer, messageElement);
    });
  }
}

// logs test results to the console and optionally to the page message area
function logTestResults(results) {
  // show in console as a simple table (easy to read)
  if (console && console.table) {
    console.table(results);
  } else {
    console.log(results);
  }

  // also show a short summary in the UI (optional)
  var messageElement = document.getElementById("products-message");
  if (!messageElement) {
    return;
  }

  var total = results.length;
  var passed = 0;

  for (var i = 0; i < results.length; i++) {
    if (results[i].pass) {
      passed++;
    }
  }

  // keep it short
  messageElement.textContent = "Test report: " + passed + "/" + total + " passed.";
  messageElement.className = passed === total ? "info-text success" : "info-text error";
}

//show products function / get them from the json and pass them to the html
function showProducts(products, container, messageElement) {
  // if container empty or none return nothing.
  if (!container) {
    return;
  }

  //clear container before showing the products 
  container.innerHTML = "";

  //if products empty or non existent show alert
  if (!products || products.length === 0) {
    if (messageElement) {
      messageElement.textContent = "No products found.";
      messageElement.className = "info-text error";
    }
    return;
  }

  //set message to empty
  if (messageElement) {
    // don't clear if it's a validation message already
    if (messageElement.textContent === "No products found.") {
      messageElement.textContent = "";
    }
  }

  // for each product function
  products.forEach(function (item) {

    // create a new article element for the product card
    var card = document.createElement("article");
    //add the css class so it gets the product-card styling
    card.className = "product-card";

    // create a img element 
    var img = document.createElement("img");
    //set the image source from the product data
    img.src = item.image;
    // set the alt text using products name 
    img.alt = item.name;

    // create an h2 element for tittle of product
    var title = document.createElement("h2");
    // set the text content using products name
    title.textContent = item.name;

    // create a p element for price 
    var price = document.createElement("p");
    //add the css class for price styling
    price.className = "price";
    //show the price with dollar sing and 2 decimals
    price.textContent = "$" + item.price.toFixed(2);

    //create a p element for descriptions
    var desc = document.createElement("p");
    //add the css class for the desc styling
    desc.className = "description";
    // sets the descr content from the product data (json)
    desc.textContent = item.description;

    // add info to the product card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(desc);

    //add the finished product card to the html
    container.appendChild(card);
  });
}
