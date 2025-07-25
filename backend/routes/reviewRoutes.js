const express = require('express');
const {  getReviews,addReview } = require('./../controller/reviewController');

const router= express.Router();

router.get("/:productId",getReviews);
router.post("/:productId",addReview);

module.exports= router;