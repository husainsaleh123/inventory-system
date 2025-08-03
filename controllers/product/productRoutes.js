const express = require("express");
const multer = require('multer');
const path = require("path");  // Import path module for file handling
const router = express.Router();
const productViews = require("./productViews");  // Corrected import for productViews
const productData = require("./productData");

// Multer setup to save uploaded images in the 'public/uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');  // Files will be stored in 'public/uploads/'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Set a unique filename
    }
});

const upload = multer({ storage: storage });  // Initialize multer

// Route for creating a new product with image upload
router.post("/", upload.single('image'), productData.create, productViews.redirectHome);  // Changed to productViews

// Route to edit a product with image upload
router.put("/:id", upload.single('image'), productData.update, productViews.redirectShow);  // Changed to productViews

// Index - Show all products
router.get("/", productData.index, productViews.index);

// New - Show form to create a new product
router.get("/new", productViews.newView);

// Destroy - Handle product deletion
router.delete("/:id", productData.destroy, productViews.redirectHome);

// Update - Handle updating an existing product
router.put("/:id", productData.update, productViews.redirectShow);

// Create - Handle new product creation
router.post("/", productData.create, productViews.redirectHome);

// Edit - Show form to edit an existing product
router.get("/:id/edit", productData.show, productViews.edit);

// Show - Show details of a specific product
router.get("/:id", productData.show, productViews.show);

module.exports = router;
