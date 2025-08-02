const express = require("express");
const app = express();
const morgan = require("morgan");
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");
const productRoutes = require("./controllers/product/productRoutes");

app.set("views", "./views"); // Ensure this is set to your views folder location
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine()); // JSX view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
    res.locals.data = {};  // Resetting the locals data before each request
    next();
});

app.use(express.static("public"));  // Static files served here
app.use(morgan('dev'));  // Logger for development
app.use("/products", productRoutes);  // Using product routes

module.exports = app;
