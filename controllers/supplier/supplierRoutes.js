const express = require("express");
const multer = require('multer');
const path = require("path");  // Import path module for file handling
const router = express.Router();
const supplierViews = require("./supplierViews");  // Corrected import for supplierViews
const supplierData = require("./supplierData");

// Multer setup to save uploaded images in the 'public/uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');  // The logo image will be stored in 'public/uploads/'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Set a unique filename
    }
});

const upload = multer({ storage: storage });  // Initializes the multer through an upload variable

// Route for creating a new supplier with image upload
router.post("/", upload.single('image'), supplierData.create, supplierViews.redirectHome);  
// Route to edit a supplier with image upload
router.put("/:id", upload.single('image'), supplierData.update, supplierViews.redirectShow);  

// Index - Show all suppliers
router.get("/", supplierData.index, supplierViews.index);

// New - Show form to create a new supplier
router.get("/new", supplierViews.newView);

// Destroy - Handle supplier deletion
router.delete("/:id", supplierData.destroy, supplierViews.redirectHome);

// Update - Handle updating an existing supplier
router.put("/:id", supplierData.update, supplierViews.redirectShow);

// Create - Handle new supplier creation
router.post("/", supplierData.create, supplierViews.redirectHome);

// Edit - Show form to edit an existing supplier
router.get("/:id/edit", supplierData.show, supplierViews.edit);

// Show - Show details of a specific supplier
router.get("/:id", supplierData.show, supplierViews.show);

module.exports = router;
