const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    product: { type: String, required: true }, //must be a product that's already in the products page
    supplier: { type: String, required: true }, //manually typing supplier name, must be stored in the suppliers model in prior
    link: { type: String, required: true }, //contains the order link from actual client website
    status: { type: String, required: true }, //Pending, Shipped, Arrived, Received
    date: { type: Date, required: true }, //automatically added
    quantity: { type: Number, required: true }, //manually added
    total: { type: Number, required: true }, //calculated automatically: Gets the price per quantity from the product, then multiplies by quantity provided here


    // This field will reference the product schema
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product" 
    }]
});

const Order = mongoose.model("Order",orderSchema)

module.exports=Order