const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    name:String,
    comment:String,
    rating:Number,
    createdAt: { type: Date, default: Date.now },
})
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review