const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customer: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true },
    total: { type: Number, required: true },

    // This field will reference the product schema
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product" 
    }]
});

const Order = mongoose.model("Order",orderSchema)

module.exports=Order