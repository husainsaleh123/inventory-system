const Product = require('../../models/product');
const Supplier = require('../../models/supplier'); // Import Supplier
const productData = {};

//  INDEX - Show all products
productData.index = async (req, res, next) => {
    try {
        // const user = await req.user.populate('products');
        const user = await req.user.populate({
            path: 'products',
            populate: { path: 'supplier', model: 'Supplier' }
        });

        res.locals.data = {};
        res.locals.data.products = user.products;
        res.locals.data.token = req.query.token || req.headers.authorization?.split(" ")[1];

        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// DELETE - Removes a product
productData.destroy = async (req, res, next) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// UPDATE - Updates an existing product
productData.update = async (req, res, next) => {
    req.body.available = req.body.available === "on";

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

// CREATE - Add a new product and link it to supplier
productData.create = async (req, res, next) => {
    req.body.available = req.body.available === 'on';

    if (req.file) {
        req.body.image = req.file.filename;
    }

    try {
        // Normalize supplier name
        const supplierName = req.body.supplierName?.trim();

        // Case-insensitive search for supplier
        const supplier = await Supplier.findOne({
            name: { $regex: new RegExp(`^${supplierName}$`, 'i') }  // case-insensitive exact match
        });

        if (!supplier) {
            return res.send(`
                <script>
                    alert("Supplier '${supplierName}' not found! Please add it first.");
                    window.location.href = "/suppliers/new?token=${req.query.token}";
                </script>
            `);
        }

        req.body.supplier = supplier._id;

        const newProduct = await Product.create(req.body);

        if (!req.user.products) req.user.products = [];
        req.user.products.addToSet(newProduct._id);
        await req.user.save();

        res.locals.data.product = newProduct;
        res.locals.data.token = req.query.token || req.headers.authorization?.split(" ")[1];
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


// SHOW - Display one product
productData.show = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplier');
        if (!product) {
            throw new Error(`Could not locate a product with the id ${req.params.id}`);
        }

        const suppliers = await Supplier.find();

        res.locals.data.product = product;
        res.locals.data.suppliers = suppliers;
        res.locals.data.token = req.query.token || req.headers.authorization?.split(" ")[1];

        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = productData;
