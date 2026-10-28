const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("."));

let products = [];

app.post("/products", (req, res) => {
    products.push(req.body);
    res.send("Product Added Successfully");
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(3011, () => {
    console.log("Server running on port 3011");
});