fetch('http://localhost:3000/menu')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(menuData => {
    console.log(menuData);
    // Assuming menuData is an object with keys "Appetizers", "Mains", "Desserts"
    const categories = ["Appetizers", "Mains", "Desserts"];
    categories.forEach(category => {
      if (menuData.hasOwnProperty(category)) {
        // Call populateMenuItems for each category
        populateMenuItems(menuData[category]);
      } else {
        console.error(`Category '${category}' not found in menu data.`);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching or rendering menu:', error);
  });

// Get the select element for menu items
const menuItemSelect = document.getElementById('menuItem');

// Function to populate the dropdown with menu items
function populateMenuItems(menuItems) {
    // Loop through each menu item in the category
    menuItems.forEach(item => {
        // Create an option element for the menu item
        const option = document.createElement('option');
        option.value = item.name; // Set the value to the name of the menu item
        option.textContent = item.name; // Set the text content to the name of the menu item
        menuItemSelect.appendChild(option); // Append the option to the select element
    });
}

// Define an array to store submitted reviews
const reviews = [];

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Get form data
    let name = document.getElementById('name').value;
    let menuItem = document.getElementById('menuItem').value;
    let rating = document.getElementById('rating').value;
  
    // Validate form data
    if (!name || !menuItem || !rating) {
      console.error('Please fill out all fields.');
      return;
    }
    
    // Create a review object
    const review = {
      name: name,
      menuItem: menuItem,
      rating: rating
    };
    
    // POST the review data to the server
    fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      // Clear form fields if the review was successfully submitted
      document.getElementById('name').value = '';
      document.getElementById('menuItem').selectedIndex = 0;
      document.getElementById('rating').selectedIndex = 0;
      // Refresh displayed reviews
      displayReviews();
    })
    .catch(error => {
      console.error('Error submitting review:', error);
    });
}

function displayReviews() {
  fetch('http://localhost:3000/reviews')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(reviews => {
      // Display reviews on the page
      const reviewsContainer = document.getElementById('reviewsContainer');
      reviewsContainer.innerHTML = ''; 
      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.textContent = `Name: ${review.name}, Item: ${review.menuItem}, Rating: ${review.rating}`;
        reviewsContainer.appendChild(reviewElement);
      });
    })
    .catch(error => {
      console.error('Error fetching or rendering reviews:', error);
    });
}

// Call displayReviews initially to populate reviews on page load
displayReviews();

const reviewForm = document.getElementById('reviewForm');

// Add an event listener to the form's submit event
reviewForm.addEventListener('submit', handleFormSubmit);
