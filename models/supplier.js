const mongoose = require("mongoose")

const supplierSchema = new mongoose.Schema({
    image: { type: String, default: 'path_to_default_image.jpg' }, // Image URL, defaults to default image
    name: { type: String, required: true }, //name of the supplier business
    address: { type: String, required: true }, //address including country
    phone: { type: Number, required: true }, //phone number including country code
    email: { type: String, required: true }, //email entered

    // This field will reference the product schema
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product" 
    }]
});

const Supplier = mongoose.model("Supplier",supplierSchema)

module.exports=Supplier