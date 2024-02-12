fetch('http://localhost:3000/menu')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(menuData => {
    console.log(menuData);

    // Now you can work with the menuData object
    // For example, you can access the Appetizers and Mains arrays like this:
    const appetizers = menuData.menu.Appetizers;
    const mains = menuData.menu.Mains;

    console.log(appetizers); 

    // Call renderMenu function for each appetizer
    appetizers.forEach(renderMenu);
    // Call renderMenu function for each main
    mains.forEach(renderMenu);
  })
  .catch(error => {
    console.error('Error fetching menu data:', error);
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

  // Append the menu item container to the menu section in the HTML
  const menuSection = document.getElementById('menuSection');
  menuSection.appendChild(menuItem);
}
