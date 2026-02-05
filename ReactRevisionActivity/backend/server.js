const express = require("express");
const cors = require("cors")
const path = require("path");
const morgan = require("morgan");
const products = require("./data");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;
app.use(cors({
  origin:"http://localhost:3001"
}))
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.get("/admin", (req, res) => {
  res.render("admin", { products });
});

app.get("/error", (req, res, next) => {
  next(new Error("Manually triggered error"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
