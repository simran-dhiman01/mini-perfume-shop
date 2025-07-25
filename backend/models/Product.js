const mongoose = require('mongoose')
const productSchemea = mongoose.Schema({
    name: String,
    description: String,    //3 to 4 lines description
    notes:String,           // top notes in the perfume e.g. floral , vanilla.
    price: Number,
    category: String,      //men,women,unisex,
    images: [String],
    sizes: [String],
    sale: {
        type: Boolean,
        default: false
    },
    salePrice: {
        type: Number,
        default: null
    },
    inStock:{
        type:Boolean,
        default:true
    },
    bestSeller: {
        type: Boolean,
        default: false
    }

})
const Product = mongoose.model('Product', productSchemea)
module.exports = Product