const sendChatBtn = document.querySelector('.chat-input span');
const chatInput = document.querySelector('.chat-input textarea');
const chatBox = document.querySelector('.chatbox');
const chatToggler = document.querySelector('.chatbot-toggler');
const chatClosePhone = document.querySelector('.close-btn');

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<p>$</p> <span>🧑‍🍳</span>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    };

    fetch(API_URL, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            messageElement.textContent = data.choices[0].message.content;
        })
        .catch((err) => {
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("...", "incoming");
        chatBox.appendChild(incomingChatLi);
        chatBox.scrollTo(0, chatBox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatClosePhone.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

sendChatBtn.addEventListener("click", handleChat);

fetch('http://localhost:3000/menu')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(menuData => {
    console.log(menuData);
    
    const categories = ["Appetizers", "Mains", "Desserts"];
    categories.forEach(category => {
      if (menuData.hasOwnProperty(category)) {
        populateMenuItems(menuData[category]);
      } else {
        console.error(`Category '${category}' not found in menu data.`);
        console.log(menuData);
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
        option.value = item.name; 
        option.textContent = item.name; 
        menuItemSelect.appendChild(option); 
    });
}

// Define an array to store submitted reviews
const reviews = [];

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); 
    
    // Get form data
    let name = document.getElementById('name').value;
    let menuItem = document.getElementById('menuItem').value;
    let rating = document.getElementById('rating').value;
  
    // Validate form data
    if (!name || !menuItem || !rating) {
      console.error('Please fill out all fields.');
      return;
    }
    
    // Create object from form submit
    const review = {
      name: name,
      menuItem: menuItem, 
      rating: rating 
    };

    // POST the review data to the server - to be viewed on site after POST
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
      // Display reviews on the page (empty HTML)
      const reviewsContainer = document.getElementById('reviewsContainer');
      reviewsContainer.innerHTML = ''; 
      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.textContent = ` 🤌  ${review.name} gave the ${review.menuItem} a rating of ${review.rating} stars 🌟`;
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
reviewForm.addEventListener('submit', handleFormSubmit);
console.log(reviews);

const url = "http://localhost:3000/menu"
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    ;
      // Data is an array, so you can iterate over it
   
        showMain(data);
        showAppetizer(data);
        showDessert(data)

  })
  

  function showMain(menuData) {
        // Get the <ul> element
        let ul = document.querySelector("#mainul");

        // Loop through each main food item in the Mains array
        menuData.Mains.forEach(main => {
            // Create a new <li> element
            let name = document.createElement("h2");
            let desLi = document.createElement("h3");
            let priceLi = document.createElement("li");
            // Set the text content of the <li> to the name of the main food
            name.textContent = main.name;
            name.style.color = "white";
            name.style.fontWeight = "bold";
            name.style.fontSize = '1.3rem'
            name.style.marginBottom = "0";
             desLi.textContent = main.description
             desLi.style.color = "white"
             desLi.style.fontSize = '1rem'
             desLi.style.color = "white"
                priceLi.textContent = main.price
                priceLi.style.color = "white"

             ul.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
             ul.style.height = "auto"
             
            // Append the <li> to the <ul>
            ul.append(name, desLi, priceLi);
        });
   
}

function showAppetizer (menuData) {
    let ul = document.querySelector("#appul")

    menuData.Appetizers.forEach(appetizer => {
        let name = document.createElement("h2");
        let desLi = document.createElement("h3");
        let priceLi = document.createElement("li");

        name.textContent = appetizer.name;
        name.style.color = "white";
        name.style.fontWeight = "bold";
        name.style.fontSize = '1.3rem'
        name.style.marginBottom = "0";
         desLi.textContent = appetizer.description
         desLi.style.color = "white"
         desLi.style.fontSize = '1rem'
         desLi.style.color = "white"
            priceLi.textContent = appetizer.price
            priceLi.style.color = "white"

         ul.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
         ul.style.height = "auto"
        ul.append(name, desLi, priceLi)
    })
}
function showDessert (menuData) {
    let ul = document.querySelector("#desul")

    menuData.Desserts.forEach(dessert => {
        let name = document.createElement("h2");
        let desLi = document.createElement("h3");
        let priceLi = document.createElement("li");

        name.textContent = dessert.name;
        name.style.color = "white";
        name.style.fontWeight = "bold";
        name.style.fontSize = '1.3rem'
        name.style.marginBottom = "0";
        desLi.textContent = dessert.description
        desLi.style.color = "white"
        desLi.style.fontSize = '1rem'
        desLi.style.color = "white"
        priceLi.textContent = dessert.price
        priceLi.style.color = "white"

         ul.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
         ul.style.height = "auto"
        ul.append(name, desLi, priceLi)
    })
}

//RESERVATION FORM EVENT LISTENER

      document.getElementById("reservationForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          document.getElementById("reservationForm").classList.add("hidden");
          document.getElementById("confirmationMessage")
          .classList.remove("hidden");
        });
