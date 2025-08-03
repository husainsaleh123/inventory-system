const supplier = require('../../models/supplier');
const supplierData = {};

// Index
supplierData.index = async (req, res, next) => {
    try {
        const suppliers = await supplier.find({});  
        res.locals.data.suppliers = suppliers;
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Delete
supplierData.destroy = async (req, res, next) => {
    try {
        await supplier.findByIdAndDelete(req.params.id);  
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Update
supplierData.update = async (req, res, next) => {
    if (req.body.available === "on" || req.body.available === true) {
        req.body.available = true;
    } else {
        req.body.available = false;
    }


    // Handle logo upload if a new logo is added
    if (req.file) {
        req.body.logo = req.file.filename;  // Store the logo image filename (not the full path)
    }

    try {
        res.locals.data.supplier = await supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


// Create
supplierData.create = async (req, res, next) => {
    if (req.body.available === "on" || req.body.available === true) {
        req.body.available = true;
    } else {
        req.body.available = false;
    }

    // Handles the image upload if an image is provided
    if (req.file) {
        req.body.image = req.file.filename;  // Store the image filename in the database
    }

    try {
        const newsupplier = await supplier.create(req.body);  
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Show
supplierData.show = async (req, res, next) => {
    try {
        const foundsupplier = await supplier.findById(req.params.id);
        res.locals.data.supplier = foundsupplier;  // Ensure all supplier fields are passed, including image
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = supplierData;
