const express = require("express");
const multer = require('multer');
const path = require("path");
const router = express.Router();
const productViews = require("./productViews");
const productData = require("./productData");
const authDataController = require('../auth/dataController.js');

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// INDEX - Show all products
router.get('/', authDataController.auth
    /* check if the token exists in the header or the query, set req.user and res.locals.data.token */ , 
    productData.index
    /*grab and save the logged in user's fruits */, 
    productViews.index
    /* display the logged in users fruits and also the link to the new page with the token*/
);
// NEW - Show form to create new product
router.get("/new", authDataController.auth, productViews.newView);

// DELETE - Delete product
router.delete("/:id", authDataController.auth, productData.destroy, productViews.redirectHome);

// UPDATE - Submit edited product
router.put("/:id", authDataController.auth, upload.single('image'), productData.update, productViews.redirectShow);

// CREATE - Submit new product
router.post("/", authDataController.auth, upload.single('image'), productData.create, productViews.redirectHome);

// EDIT - Show edit form
router.get("/:id/edit", authDataController.auth, productData.show, productViews.edit);

// SHOW - Individual product
router.get("/:id", authDataController.auth, productData.show, productViews.show);

module.exports = router;
