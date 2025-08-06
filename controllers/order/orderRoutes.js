const express = require("express");
const multer = require('multer');
const path = require("path");
const router = express.Router();
const orderViews = require("./orderViews");
const orderData = require("./orderData");
const authDataController = require('../auth/dataController.js');


// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// INDEX - Show all orders
router.get('/', authDataController.auth
    /* check if the token exists in the header or the query, set req.user and res.locals.data.token */ , 
    orderData.index
    /*grab and save the logged in user's fruits */, 
    orderViews.index
    /* display the logged in users fruits and also the link to the new page with the token*/
);
// NEW - Show form to create new order
router.get("/new", authDataController.auth, orderViews.newView);

// DELETE - Delete order
router.delete("/:id", authDataController.auth, orderData.destroy, orderViews.redirectHome);

// UPDATE - Submit edited order
router.put("/:id", authDataController.auth, upload.single('image'), orderData.update, orderViews.redirectShow);

// CREATE - Submit new order
router.post("/", authDataController.auth, upload.single('image'), orderData.create, orderViews.redirectHome);

// EDIT - Show edit form
router.get("/:id/edit", authDataController.auth, orderData.show, orderViews.edit);

// SHOW - Individual order
router.get("/:id", authDataController.auth, orderData.show, orderViews.show);

module.exports = router;
