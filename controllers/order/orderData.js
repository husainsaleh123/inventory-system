const Order = require('../../models/order');
const orderData = {};

// INDEX - Get all orders for the logged-in user
orderData.index = async (req, res, next) => {
    try {
        const token = req.query.token || req.headers.authorization?.split(" ")[1];

        // Fetch actual order documents linked to the user
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
        // Defensive default for safety
        req.body = req.body || {};

        if (typeof req.body === 'object') {
            req.body.available = req.body.available === 'on';
        }

        if (req.file) {
            req.body.image = req.file.filename;
        }

        // Now safe to set
        req.body.user = req.user._id;

        const newOrder = await Order.create(req.body);

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
            throw new Error(`Could not locate a order with ID ${req.params.id}`);
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
