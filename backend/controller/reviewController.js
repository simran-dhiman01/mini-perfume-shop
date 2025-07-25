const Review = require('../models/Review')

//get reviews posted by others
const getReviews = async (req, res) => {
    try {
        const productId = req.params.productId
        const reviews = await Review.find({ productId });
        if (!reviews) {
            return res.status(404).json({
                message: "No reviews.",
                success: false
            })
        }
        res.status(200).json({
            reviews,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }
}

//post review of particular product
const addReview = async (req, res) => {
    try {
        const {name, comment, rating} = req.body;
        const newReview = await Review.create({
            productId:req.params.productId,
            name,
            comment,
            rating
        })
        res.status(201).json({
            newReview,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }
}
module.exports = {
    getReviews,
    addReview
}