//Shuffle products
function shuffleProducts(productsArray) {
    for (let i = productsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [productsArray[i], productsArray[j]] = [productsArray[j], productsArray[i]];
    }
    return productsArray;
}

//Debounce utility function for search optimization
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

//Display products
function displayProducts(productsToDisplay) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (!productsToDisplay || productsToDisplay.length === 0) {
        productList.innerHTML = "<p>No products match your filters.</p>";
        return;
    }

    productsToDisplay.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p id="price-${product.id}">Select a size to see the price</p>
            <select id="size-${product.id}" onchange="updatePrice(${product.id})">
                <option value="">Select Size</option>
                ${product.size.map((size) => `<option value="${size}">${size}</option>`).join('')}
            </select>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        //Add event listener for the "Add to Cart" button (no cart functionality or popup)
        const addToCartButton = productCard.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', () => {
        });

        productList.appendChild(productCard);
    });
}

//Update price when a new size is selected
function updatePrice(productId) {
    const sizeSelect = document.getElementById(`size-${productId}`);
    const selectedSize = sizeSelect.value;
    const product = products.find((item) => item.id === productId);

    const price = selectedSize && product.price.hasOwnProperty(selectedSize)
        ? product.price[selectedSize]
        : Math.min(...Object.values(product.price));

    const priceElement = document.getElementById(`price-${productId}`);
    priceElement.textContent = price ? `Price for ${selectedSize}: ₹${price}` : "Select a size to see the price";
}

//Filter and display products based on user input
function filterAndDisplayProducts() {
    const query = document.getElementById('searchBar').value.trim().toLowerCase();
    let filteredProducts = [...products];

    const selectedCategory = document.getElementById('categoryFilter').value.toLowerCase();
    const selectedColor = document.getElementById('colorSort').value.toLowerCase();
    const selectedPriceSort = document.getElementById('priceSort').value;

    //Filter by category
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(product =>
            product.category.toLowerCase() === selectedCategory
        );
    }

    //Filter by color
    if (selectedColor !== "all") {
        filteredProducts = filteredProducts.filter(product =>
            product.color.toLowerCase() === selectedColor
        );
    }

    //Filter by search query
    if (query) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(query)
        );
    }

    //Sort by price
    if (selectedPriceSort === "asc") {
        filteredProducts.sort((a, b) => Math.min(...Object.values(a.price)) - Math.min(...Object.values(b.price)));
    } else if (selectedPriceSort === "desc") {
        filteredProducts.sort((a, b) => Math.min(...Object.values(b.price)) - Math.min(...Object.values(a.price)));
    }

    //Display the filtered products
    displayProducts(filteredProducts);
}

//Reset filters and search bar
function resetFilters() {
    document.getElementById('categoryFilter').value = "all";
    document.getElementById('priceSort').value = "";
    document.getElementById('colorSort').value = "all";
    document.getElementById('searchBar').value = "";

    displayProducts(products); //Show all products
}

//Event listeners for filters and search
document.addEventListener('DOMContentLoaded', () => {
    const randomizedProducts = shuffleProducts([...products]);
    displayProducts(randomizedProducts);

    // Attach event listeners
    document.getElementById('categoryFilter').addEventListener('change', filterAndDisplayProducts);
    document.getElementById('priceSort').addEventListener('change', filterAndDisplayProducts);
    document.getElementById('colorSort').addEventListener('change', filterAndDisplayProducts);
    document.getElementById('searchBar').addEventListener('input', debounce(filterAndDisplayProducts, 300));

    // Reset filters button
    document.getElementById("clearFilters").addEventListener('click', resetFilters);
});
