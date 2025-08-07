const Order = require('../../models/order');
const Product = require('../../models/product'); 
const orderData = {};

// INDEX - Get all orders for the logged-in user
orderData.index = async (req, res, next) => {
    try {
        const token = req.query.token || req.headers.authorization?.split(" ")[1];

        const orders = await Order.find({ user: req.user._id });

        res.locals.data = {
            orders,
            token
        };

        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

orderData.create = async (req, res, next) => {
    try {
        req.body = req.body || {};

        // Set available checkbox
        if (typeof req.body === 'object') {
            req.body.available = req.body.available === 'on';
        }

        // Image handling
        if (req.file) {
            req.body.image = req.file.filename;
        }

        // Gets the product by ID from hidden input
        const product = await Product.findById(req.body.productId).populate('supplier');
        if (!product) throw new Error("Selected product not found.");

        // Auto-fill fields from product
        req.body.productName = product.name;
        req.body.supplierName = product.supplier?.name || "Unknown Supplier";
        req.body.image = req.body.image || product.image; // fallback to product image if no upload

        // Auto-calculates the total
        const quantity = parseInt(req.body.quantity) || 0;
        req.body.total = product.price * quantity;

        // Attach user ID
        req.body.user = req.user._id;

        // Create order
        const newOrder = await Order.create(req.body);

        // Link order to user
        if (!req.user.orders) req.user.orders = [];
        req.user.orders.addToSet?.(newOrder._id);
        await req.user.save();

        res.locals.data.order = newOrder;
        res.locals.data.token = req.query.token || req.headers.authorization?.split(" ")[1];
        next();

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

orderData.show = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            throw new Error(`Could not locate an order with ID ${req.params.id}`);
        }
        res.locals.data.order = order;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

orderData.update = async (req, res, next) => {
    try {
        if (req.body && typeof req.body === 'object') {
            req.body.available = req.body.available === 'on';
        }

        if (req.file) {
            req.body.image = req.file.filename;
        }

        // Recalculate total before saving
        const product = await Product.findOne({ name: req.body.productName });
        if (product) {
            const quantity = parseInt(req.body.quantity) || 0;
            req.body.total = product.price * quantity;
        }

        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.locals.data.order = updated;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

orderData.destroy = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = orderData;
