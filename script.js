// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully');
});
document.addEventListener("DOMContentLoaded", function() {
    const heroSection = document.querySelector(".hero");
    
    // Intersection Observer to detect when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.classList.add("animate");
            } else {
                document.body.classList.remove("animate");
            }
        });
    }, { threshold: 0.5 });

    // Start observing the hero section
    observer.observe(heroSection);
});

document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const navLinks = document.querySelector('.nav-links');

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggle 'active' class
    });

    // Add event listener for scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navLinks.classList.add('visible'); // Show nav links when scrolled down
        } else {
            navLinks.classList.remove('visible'); // Hide nav links when at the top
        }
    });
});
// Initialize cart (stored in localStorage) or empty array if none exists
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(productName, productPrice) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        // If product exists, increase quantity
        existingProduct.quantity += 1;
    } else {
        // Otherwise, add new product
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the cart icon with the new count
    updateCartCount();
    
    alert(`${productName} has been added to your cart!`);
}

// Function to update the cart count (number of items in cart)
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = itemCount;
}

// Function to toggle cart modal visibility
function toggleCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal.style.display === 'none' || cartModal.style.display === '') {
        cartModal.style.display = 'block';
        showCartSummary(); // Show cart contents when modal is opened
    } else {
        cartModal.style.display = 'none';
    }
}

// Function to display cart summary in the modal
function showCartSummary() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Clear the current cart items
    cartItemsElement.innerHTML = '';
    
    let total = 0;
    
    // Loop through cart items and display them
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <span><strong>${item.name}</strong> - R${item.price} x ${item.quantity}</span>
            <span>Total: R${itemTotal.toFixed(2)}</span>
        `;
        cartItemsElement.appendChild(cartItem);
    });
    
    // Update total price
    cartTotalElement.textContent = `Total: R${total.toFixed(2)}`;
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Initialize cart from localStorage or set it to an empty array
 cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount(); // Update cart count on page load

function addToCart(product, price) {
    const existingItem = cart.find(item => item.name === product);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: product, price: price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartCount(); // Update cart count in the icon
    showCartSummary(); // Update the modal to show the new item
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function toggleCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    showCartSummary(); // Show the cart summary when modal is opened
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before proceeding to checkout.");
        return;
    }
    alert("Proceeding to checkout...");
    // Implement checkout logic here (e.g., redirect to checkout page)
}

function clearCart() {
    cart = []; // Empty the cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartCount(); // Update cart count in the icon
    showCartSummary(); // Update the modal to show the cleared cart
    alert("Your cart has been cleared.");
}

function showCartSummary() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    // Clear the current cart items
    cartItemsElement.innerHTML = '';

    let total = 0;

    // Loop through cart items and display them
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <span><strong>${item.name}</strong> - R${item.price}</span>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${index}, 'decrease')">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 'increase')">+</button>
            </div>
            <span>Total: R${itemTotal.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
        `;
        cartItemsElement.appendChild(cartItem);
    });

    // Update total price
    cartTotalElement.textContent = `Total: R${total.toFixed(2)}`;

    // If cart is empty, show a message
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<li>Your cart is empty.</li>';
        cartTotalElement.textContent = `Total: R0.00`;
    }
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, action) {
    if (action === 'increase') {
        cart[index].quantity++;
    } else if (action === 'decrease') {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            alert("Quantity cannot be less than 1.");
            return;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    showCartSummary(); // Update the cart display
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartCount(); // Update cart count in the icon
    showCartSummary(); // Update the modal to show the new cart state
}