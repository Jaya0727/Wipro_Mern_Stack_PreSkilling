const productContainer = document.getElementById("productContainer");
const loading = document.getElementById("loading");
const categoryFilter = document.getElementById("categoryFilter");
let allProducts = [];
// Fetch products
async function fetchProducts() {
    try {
        const response = await fetch("products.json");
        allProducts = await response.json();
        loading.style.display = "none";
        displayProducts(allProducts);
    } catch (error) {
        loading.textContent = "Error loading products";
    }
}
// Display products
function displayProducts(products) {
    productContainer.innerHTML = "";
    for (const product of products) {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
            <div class="card h-100 p-3">
                <h5>${product.title}</h5>
                <p>Category: ${product.category}</p>
                <p>Price: ₹${product.price}</p>
            </div>
        `;
        productContainer.appendChild(col);
    }
}
// Filter logic
categoryFilter.addEventListener("change", () => {
    const value = categoryFilter.value;

    if (value === "all") {
        displayProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter(
            product => product.category === value
        );
        displayProducts(filteredProducts);
    }
});
fetchProducts();
