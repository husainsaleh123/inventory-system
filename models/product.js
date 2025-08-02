const mongoose=require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number,required:true},
    stock: {type:Number,required:true},
    supplier: {type:String,required:true},
    country: {type:String,required:true},
    available: Boolean,
    // image: { type: String, required: false } // Optional field for image URL
});

const Product = mongoose.model("Product",productSchema)

module.exports=Product