# Campus Essentials

Campus Essentials is a  eCommerce-style web application that displays campus-related products using structured JSON data. The project focuses on **data validation, testing, and reliable client-side behavior** without using external UI frameworks.

## Live Demo
The application is deployed on AWS and can be accessed here:
()

## Features
- Multi-page layout (Home, Products, Contact)
- Products loaded dynamically from a JSON file
- Category filtering and price sorting
- Input validation for the contact form
- Basic error handling and user feedback

## Testing & Validation
- Validates product data before rendering
- Runs lightweight JavaScript test scripts (PASS/FAIL) to verify:
  - Product loading
  - Sorting behavior
  - Data integrity
- Test results are logged in the browser console

## Technologies Used
- HTML
- CSS
- JavaScript
- JSON

## How to Run
Because the app uses `fetch()` to load JSON data, it must be run with a local server.

Example:
```bash
python3 -m http.server# eCommerce-
# eCommerce-App
