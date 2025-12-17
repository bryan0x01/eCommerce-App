function runProductTests(products) {
  // results array
  var results = [];

  // test 1: products loaded
  results.push(makeTestResult(
    "Products loaded (array not empty)",
    Array.isArray(products) && products.length > 0
  ));

  // test 2: all products pass validation
  results.push(makeTestResult(
    "All products pass validation checks",
    productsEveryValid(products)
  ));

  // test 3: sorting low -> high works
  results.push(makeTestResult(
    "Sort low-to-high returns ascending prices",
    testPriceSortingLowHigh(products)
  ));

  // test 4: filtering by category only returns matching items
  results.push(makeTestResult(
    "Filter by category returns only matching items",
    testCategoryFilter(products)
  ));

  return results;
}

// creates one test result object
function makeTestResult(name, pass) {
  return {
    name: name,
    pass: !!pass
  };
}

// checks if every product is valid using validateProduct
function productsEveryValid(products) {
  // if products isn't an array, fail
  if (!Array.isArray(products)) {
    return false;
  }

  // loop through and validate
  for (var i = 0; i < products.length; i++) {
    if (!validateProduct(products[i])) {
      return false;
    }
  }

  return true;
}

// tests that sorting by price low->high produces ascending prices
function testPriceSortingLowHigh(products) {
  // make a copy so we don't change original
  var list = products.slice();

  // sort ascending
  list.sort(function (a, b) {
    return a.price - b.price;
  });

  // check ascending order
  for (var i = 1; i < list.length; i++) {
    if (list[i].price < list[i - 1].price) {
      return false;
    }
  }

  return true;
}

// tests that filtering by one known category works
function testCategoryFilter(products) {
  // choose a category that should exist in your JSON
  var category = "study";

  // filter
  var filtered = products.filter(function (item) {
    return item.category === category;
  });

  // if there are no study items, we can't really test (treat as fail)
  if (filtered.length === 0) {
    return false;
  }

  // verify every item matches
  for (var i = 0; i < filtered.length; i++) {
    if (filtered[i].category !== category) {
      return false;
    }
  }

  return true;
}
