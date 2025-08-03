const Product = require('../../models/product');
const productData = {};

// Index
productData.index = async (req, res, next) => {
    try {
        const products = await Product.find({});  
        res.locals.data.products = products;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Delete
productData.destroy = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);  
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Update
productData.update = async (req, res, next) => {
    if (req.body.available === "on" || req.body.available === true) {
        req.body.available = true;
    } else {
        req.body.available = false;
    }

    // Handle image upload if a new image is provided
    if (req.file) {
        req.body.image = req.file.filename;  // Store the image filename in the database
    }

    try {
        res.locals.data.product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Create
productData.create = async (req, res, next) => {
    if (req.body.available === "on" || req.body.available === true) {
        req.body.available = true;
    } else {
        req.body.available = false;
    }

    // Handle image upload if an image is provided
    if (req.file) {
        req.body.image = req.file.filename;  // Store the image filename in the database
    }

    try {
        const newProduct = await Product.create(req.body);  
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Show
productData.show = async (req, res, next) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        res.locals.data.product = foundProduct;  // Ensure all product fields are passed, including image
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = productData;
