const Product = require('../../models/product');
const productData = {};

// Index
productData.index = async (req, res, next) => {
    try {
        const user = await req.user.populate('products');  

        // ✅ Initialize res.locals.data properly
        res.locals.data = {};
        res.locals.data.products = user.products;

        // ✅ Optional: include token to be reused in views
        res.locals.data.token = req.query.token || req.headers.authorization?.split(" ")[1];

        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Delete
productData.destroy = async (req, res, next) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Update
productData.update = async (req, res, next) => {
    if (req.body.available === "on") {
        req.body.available = true;
    } else {
        req.body.available = false;
    }

    if (req.file) {
        req.body.image = req.file.filename;
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
    if (req.body.available === 'on') {
        req.body.available = true;
    } else {
        req.body.available = false;
    }

    if (req.file) {
        req.body.image = req.file.filename;
    }

    try {
        const newProduct = await Product.create(req.body);

        // ✅ Properly add the product to the user's list
        req.user.products.addToSet({ _id: newProduct._id });
        await req.user.save();

        res.locals.data.product = newProduct;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Show
productData.show = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new Error(`Could not locate a product with the id ${req.params.id}`);
        }
        res.locals.data.product = product;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = productData;
