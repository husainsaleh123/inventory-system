const Product = require('../../models/product');
const productData = {};

// index
productData.index = async (req, res, next) => {
    try {
        const products = await Product.find({});  
        res.locals.data.products = products;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// delete
productData.destroy = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);  
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// update
productData.update = async (req, res, next) => {
    if (req.body.available === "on" || req.body.available === true) {
        req.body.available = true;
    } else {
        req.body.available = false;
    }

    try {
        res.locals.data.product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// create
productData.create = async (req, res, next) => {
    if (req.body.available === "on" || req.body.available === true) {
        req.body.available = true;
    } else {
        req.body.available = false;
    }

    try {
        const newProduct = await Product.create(req.body);  // Corrected 'product' to 'Product'
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// show
productData.show = async (req, res, next) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        res.locals.data.product = foundProduct;  // Make sure all fields in `product` are passed
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = productData;
