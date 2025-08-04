const express = require("express");
const multer = require('multer');
const path = require("path");
const router = express.Router();
const productViews = require("./productViews");
const productData = require("./productData");

// Multer config to handle image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// INDEX - Show all products
router.get("/", productData.index, productViews.index);

// NEW - Show form to create new product
router.get("/new", productViews.newView);

// CREATE - Handle new product submission with image
router.post("/", upload.single('image'), productData.create, productViews.redirectHome);

// EDIT - Show form to edit existing product
router.get("/:id/edit", productData.show, productViews.edit);

// UPDATE - Handle product update with image
router.put("/:id", upload.single('image'), productData.update, productViews.redirectShow);

// DELETE - Handle product deletion
router.delete("/:id", productData.destroy, productViews.redirectHome);

// SHOW - Show individual product details
router.get("/:id", productData.show, productViews.show);

module.exports = router;
