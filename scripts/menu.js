// Open Modal with Detailed Information, including Ingredients
function openModal(element) {
    const modal = document.getElementById('drink-modal');
    const title = element.closest('.menu-item').querySelector('h3').innerText;
    const price = element.closest('.menu-item').querySelector('.price').innerText;
    const description = element.closest('.menu-item').getAttribute('data-description');
    const calories = element.closest('.menu-item').getAttribute('data-calories');
    const imgSrc = element.closest('.menu-item').querySelector('img').src;
    const ingredients = element.closest('.menu-item').getAttribute('data-ingredients').split(',');

    // Populate modal content
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('modal-calorie-count').innerText = calories;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-img').src = imgSrc;

    // Populate ingredients list
    const ingredientsList = document.getElementById('modal-ingredients');
    ingredientsList.innerHTML = ''; // Clear previous ingredients
    ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient.trim();
        ingredientsList.appendChild(listItem);
    });

    // Show modal
    modal.style.display = 'block';

    // Add event listeners for closing the modal
    document.addEventListener('keydown', closeOnEscape); // Listen for Escape key
    window.addEventListener('click', closeOnClickOutside); // Listen for outside clicks
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('drink-modal');
    modal.style.display = 'none';

    // Remove event listeners when modal is closed
    document.removeEventListener('keydown', closeOnEscape);
    window.removeEventListener('click', closeOnClickOutside);
}

// Close modal on Escape key press
function closeOnEscape(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Close modal if clicking outside of modal content
function closeOnClickOutside(event) {
    const modal = document.getElementById('drink-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Attach close function to the close button
document.querySelector('.close-btn').addEventListener('click', closeModal);
