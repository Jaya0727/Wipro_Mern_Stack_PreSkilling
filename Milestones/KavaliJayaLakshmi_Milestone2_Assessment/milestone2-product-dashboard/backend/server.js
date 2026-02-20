const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics",
    description: "laptop with advanced features"
  },
  {
    id: 2,
    name: "Mobile",
    price: 20000,
    category: "Electronics",
    description: "Newly launched smartphone"
  },
  
  {
    id:3,
    name: "Tablet",
    price: 15000,
    category: "Electronics",
    description: "mac tab"
  }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  product
    ? res.json(product)
    : res.status(404).json({ message: "Product not found" });
});

app.post("/products", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(5000, () =>
  console.log("Backend server running on http://localhost:5000")
);
