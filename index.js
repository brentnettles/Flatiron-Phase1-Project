fetch('http://localhost:3000/menu')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(menuData => {
    console.log(menuData);
    const menuItems = menuData["Appetizers","Mains"];
    if (menuItems && Array.isArray(menuItems)) {
      menuItems.forEach(renderMenu);
    } else {
      throw new Error('Invalid menu format');
    }
  })
  .catch(error => {
    console.error('Error fetching or rendering menu:', error);
  });

  function renderMenu(food) {
    // Create a div element for the menu item
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
  
    // Create h2 elements for each menu item information
    const nameElement = document.createElement('h2');
    nameElement.textContent = food.name;
  
    const descriptionElement = document.createElement('h2');
    descriptionElement.textContent = food.description || '';
  
    const priceElement = document.createElement('h2');
    priceElement.textContent = `Price: ${food.price}`;
  
    // Append h2 elements to the menu item container
    menuItem.appendChild(nameElement);
    menuItem.appendChild(descriptionElement);
    menuItem.appendChild(priceElement);
  
    // Append the menu item container to the appropriate menu section in the HTML
    const menuSection = document.getElementById('menuSection');
    if (food.category === "Appetizers") {
      const appetizersSection = document.querySelector('.Appetizers');
      appetizersSection.appendChild(menuItem);
    } else if (food.category === "Mains") {
      const mainsSection = document.querySelector('.Mains');
      mainsSection.appendChild(menuItem);
    } else if (food.category === "Desserts") {
      const dessertsSection = document.querySelector('.Desserts');
      dessertsSection.appendChild(menuItem);
    }
  }





