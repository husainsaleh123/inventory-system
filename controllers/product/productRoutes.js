const express = require("express");
const multer = require('multer');
const path = require("path");  // Import path module for file handling
const router = express.Router();
const productViews = require("./productViews");  
const productData = require("./productData");
const { auth } = require('../auth/dataController');

// Multer setup that saves the uploaded images in the 'public/uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');  // Image files will be stored in 'public/uploads/'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});

const upload = multer({ storage: storage });  // Initialize multer

router.use(auth);

// Route for creating a new product with image upload
router.post("/", upload.single('image'), productData.create, productViews.redirectHome);  

// Route to edit a product with image upload
router.put("/:id", upload.single('image'), productData.update, productViews.redirectShow);  

// Index - Show all products
router.get("/", productData.index, productViews.index);

// New - Shows the form to create a new product
router.get("/new", productViews.newView);

// Destroy - Handles the product deletion
router.delete("/:id", productData.destroy, productViews.redirectHome);

// Update - Handles the updating of an existing product
router.put("/:id", productData.update, productViews.redirectShow);

// Create - Handles the new product creation
router.post("/", productData.create, productViews.redirectHome);

// Edit - Shows the form to edit an existing product
router.get("/:id/edit", productData.show, productViews.edit);

// Show - Shows the details of a specific product
router.get("/:id", productData.show, productViews.show);

module.exports = router;
