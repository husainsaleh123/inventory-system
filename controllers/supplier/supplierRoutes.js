const express = require("express");
const multer = require('multer');
const path = require("path");
const router = express.Router();
const supplierViews = require("./supplierViews");
const supplierData = require("./supplierData");
const authDataController = require('../auth/dataController.js');

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// INDEX - Show all suppliers
router.get('/', authDataController.auth
    /* check if the token exists in the header or the query, set req.user and res.locals.data.token */ , 
    supplierData.index
    /*grab and save the logged in user's fruits */, 
    supplierViews.index
    /* display the logged in users fruits and also the link to the new page with the token*/
);
// NEW - Show form to create new supplier
router.get("/new", authDataController.auth, supplierViews.newView);

// DELETE - Delete supplier
router.delete("/:id", authDataController.auth, supplierData.destroy, supplierViews.redirectHome);

// UPDATE - Submit edited supplier
router.put("/:id", authDataController.auth, upload.single('image'), supplierData.update, supplierViews.redirectShow);

// CREATE - Submit new supplier
router.post("/", authDataController.auth, upload.single('image'), supplierData.create, supplierViews.redirectHome);

// EDIT - Show edit form
router.get("/:id/edit", authDataController.auth, supplierData.show, supplierViews.edit);

// SHOW - Individual supplier
router.get("/:id", authDataController.auth, supplierData.show, supplierViews.show);

module.exports = router;
