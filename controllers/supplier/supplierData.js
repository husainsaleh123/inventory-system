const Supplier = require('../../models/supplier');
const supplierData = {};

// ✅ INDEX - Get all suppliers for the logged-in user
supplierData.index = async (req, res, next) => {
    try {
        // Populate suppliers if defined in the user schema
        await req.user.populate('suppliers');

        res.locals.data = {};
        res.locals.data.suppliers = req.user.suppliers || [];
        res.locals.data.token = req.query.token || req.headers.authorization?.split(" ")[1];

        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// ✅ CREATE - Add a new supplier & link it to the user
supplierData.create = async (req, res, next) => {
    try {
        // Normalize 'available' checkbox
        req.body.available = req.body.available === 'on';

        // Handle uploaded image if exists
        if (req.file) {
            req.body.image = req.file.filename;
        }

        // Create the supplier
        const newSupplier = await Supplier.create(req.body);

        // 🔗 Link to user (only if suppliers array exists)
        if (!req.user.suppliers) req.user.suppliers = [];
        req.user.suppliers.addToSet?.(newSupplier._id); // optional chaining for safety
        await req.user.save();

        res.locals.data.supplier = newSupplier;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// ✅ SHOW - Get one supplier by ID
supplierData.show = async (req, res, next) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            throw new Error(`Could not locate a supplier with ID ${req.params.id}`);
        }
        res.locals.data.supplier = supplier;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// ✅ UPDATE - Update supplier info
supplierData.update = async (req, res, next) => {
    try {
        req.body.available = req.body.available === 'on';

        if (req.file) {
            req.body.image = req.file.filename;
        }

        const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.locals.data.supplier = updated;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// ✅ DELETE - Remove supplier
supplierData.destroy = async (req, res, next) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = supplierData;
