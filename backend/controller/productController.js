const Product = require('./../models/Product');

//for getting all products based on category and sale.
const getAllProducts = async (req, res) => {
  try {
    const { category, sale } = req.query;

    const filter = {};

    if (category) {
      // Keep the category case as is since it's already properly formatted from frontend
      filter.category = category;
    }
    if (sale === 'true') filter.sale = true;
    const products = await Product.find(filter);
    // Return empty array instead of 404
    return res.status(200).json({
      products: products || [],
      success: true
    });

  } catch (error) {
    console.log('Error in getAllProducts:', error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};


//for getting individual product
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
         if (!product) {
            return res.status(404).json({
                message: "Product not found.",
                success: false
            })
        }
        res.status(200).json({
            product,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error")
    }
}
module.exports = {
    getAllProducts,
    getProductById
}