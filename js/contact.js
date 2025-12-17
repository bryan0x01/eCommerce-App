function setupContactForm() {

  //get element contact-form
  var form = document.getElementById("contact-form");
  //if form not existent return nothing
  if (!form) {
    return;
  }

  //get contact-message
  var messageElement = document.getElementById("contact-message");

  //submit event listener
  form.addEventListener("submit", function (event) {
    // prevents website to reload (basically not letting do the default settings)
    event.preventDefault();

    //get inputs (name,email,message)
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var textInput = document.getElementById("message");

    // trim(removes extra spaces start/end) the values and set to empty if missing
    var name = nameInput ? nameInput.value.trim() : "";
    var email = emailInput ? emailInput.value.trim() : "";
    var text = textInput ? textInput.value.trim() : "";

    // validate using helper function
    if (!validateContactForm(name, email, text)) {
      if (messageElement) {
        messageElement.textContent = "Please enter a valid name, email, and a message (10+ characters).";
        messageElement.className = "info-text error";
      }
      return;
    }

    //after filling out the form correctly it send a thank you message
    if (messageElement) {
      messageElement.textContent = "Thank you. Your message has been sent.";
      messageElement.className = "info-text success";
    }

    //resets the form
    form.reset();
  });
}
