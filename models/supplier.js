const mongoose = require("mongoose")

const supplierSchema = new mongoose.Schema({
    logo: { type: String, default: 'path_to_default_image.jpg' }, // Image URL, defaults to default image
    name: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },

    // This field will reference the product schema
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product" 
    }]
});

const Supplier = mongoose.model("Supplier",supplierSchema)

module.exports=Supplier