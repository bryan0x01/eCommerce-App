// checks the email format 
function simpleEmailValid(email) {
  // basic check (beginner-friendly)
  return email.indexOf("@") > 0 && email.indexOf(".") > 0;
}

// validates a single product object from the JSON file
function validateProduct(item) {
  // make sure the object exists
  if (!item) {
    return false;
  }

  // required fields
  if (!item.id || !item.name) {
    return false;
  }

  // price must be a number
  if (typeof item.price !== "number") {
    return false;
  }

  // category and image should exist
  if (!item.category || !item.image) {
    return false;
  }

  return true;
}

// validates the contact form fields (returns true/false)
function validateContactForm(name, email, message) {
  // trim checks
  if (!name || name.length < 2) {
    return false;
  }

  if (!email || !simpleEmailValid(email)) {
    return false;
  }

  // message should not be too short
  if (!message || message.length < 10) {
    return false;
  }

  return true;
}
