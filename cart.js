//Mock localStorage cart key for demo
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Function to add a product to the cart
function addToCart(product) {    
    //save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));  
}
//initialize cart display on page load
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    updateCartCount(); 
});

//Function to update the cart count in the header (to reflect changes in cart items)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0); //sum up quantities
    const cartCountElement = document.getElementById("cartCount");

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

//Predefined products to keep in the cart
const predefinedCart = [
    {
        id: 10006,
        name: "Men Red Kurta Pant Set",
        category: "Men",
        price: 1200,
        size: "M",
        color: "red",
        quantity: 1,
        image: "images/men/men_kurta_pant_set/men_red_kurta_pant_set.jpeg"
    },
    {
        id: 10019,
        name: "Women Navy Blue Anarkali Pant Set",
        category: "Women",
        price: 1400,
        size: "XL",
        color: "navyblue",
        quantity: 1,
        image: "images/women/women_anarkali_pant_set/women_navyblue_anarkali_pant_dupatta_set.jpeg"
    },
    {
        id: 10053,
        name: "Boys Pink Kurta Pajama Set",
        category: "Boys",
        price: 700,
        size: "9-12 years",
        color: "Pink",
        quantity: 1,
        image: "images/boys/boys_kurta_pajama_set/boys_pink_kurta_pajama_set.jpeg"
    },
    {
        id: 10063,
        name: "Boys Yellow Sherwani Pant Set",
        category: "Boys",
        price: 900,
        size: "6-8 years",
        color: "Yellow",
        quantity: 1,
        image: "images/boys/boys_sherwani_pant_set/boys_yellow_sherwani_pant_set.jpeg"
    },
    {
        id: 10069,
        name: "Girls Purple Gown",
        category: "Girls",
        price: 900,
        size: "9-12 years",
        color: "Purple",
        quantity: 1,
        image: "images/girls/girls_gown/girls_purple_gown.jpeg"
    },
    {
        id: 10075,
        name: "Girls Grey Lehenga Choli Set",
        category: "Girls",
        price: 700,
        size: "3-5 years",
        color: "Grey",
        quantity: 1,
        image: "images/girls/girls_lehenga_choli_set/girls_grey_lehenga_choli_set.jpeg"
    }
];

// Save predefined cart to localStorage only if the cart is empty
if (!localStorage.getItem("cart") || JSON.parse(localStorage.getItem("cart")).length === 0) {
    localStorage.setItem("cart", JSON.stringify(predefinedCart));
}

//Function to display items in the cart
function displayCartItems() {
    const cartContainer = document.getElementById("cartContainer");
    const cartTotal = document.getElementById("cartTotal");

    //clear previous items
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "₹0";
        return;
    }

    let total = 0;

    //Loop through the cart items
    cart.forEach((item, index) => {
        const itemPrice = item.price || 0;
        const itemQuantity = item.quantity || 1;
        const itemTotal = itemPrice * itemQuantity;
        total += itemTotal;

        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Price: ₹${itemPrice}</p>
                    <p>Quantity: 
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">−</button>
                        <span id="quantity-${index}">${itemQuantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </p>
                    <p>Total: ₹<span id="itemTotal-${index}">${itemTotal}</span></p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartContainer.innerHTML += cartItem;
    });

    cartTotal.textContent = "₹" + total;
}

//Function to update quantity of cart item
function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;

    //ensure the quantity does not go below 1
    if (item.quantity <= 0) {
        cart.splice(index, 1); //remove item if quantity goes to 0
    }

    //save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    //re-display the updated cart(ensure total price is updated)
    displayCartItems();
    updateCartCount(); 
}

//Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    displayCartItems(); 
    updateCartCount(); 
}
