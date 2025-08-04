const express = require("express");
const app = express();
const morgan = require("morgan");
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");
const productRoutes = require("./controllers/product/productRoutes");
const authRoutes = require("./controllers/auth/routeController");  // Import authRoutes

app.set("views", "./views");
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.data = {};  
  next();
});

app.use(express.static("public"));
app.use(morgan('dev'));

// Register routes for products
app.use("/products", productRoutes);

// Register routes for authentication (signup, login, etc.)
app.use("/users", authRoutes);  // Ensure the auth routes are under `/users`

module.exports = app;
