// Sample data representing products in the store
const products = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 20, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 30, image: 'https://via.placeholder.com/150' },
];

let cart = [];

// Function to display products
function displayProducts() {
    const productsDiv = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productsDiv.appendChild(productDiv);
    });
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <h2>${item.name}</h2>
            <p>$${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;

        cartDiv.appendChild(cartItemDiv);

        total += item.price * item.quantity;
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<h2>Total: $${total}</h2>`;
    cartDiv.appendChild(totalDiv);
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    
    if (cartItemIndex > -1) {
        cart.splice(cartItemIndex, 1);
    }

    updateCart();
}

// Initial function to set up the page
function init() {
    displayProducts();
}

// Call the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

