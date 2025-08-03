const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    image: { type: String, default: 'path_to_default_image.jpg' }, // Image URL, defaults to default image
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    stock: { type: Number, required: true },
    supplier: { type: String, required: true },
    country: { type: String, required: true },
    available: { type: Boolean, required: true }
    // image: { type: String, required: false } // Optional field for image URL
});

const Product = mongoose.model("Product",productSchema)

module.exports=Product