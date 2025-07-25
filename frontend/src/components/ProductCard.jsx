import { Link } from 'react-router-dom'

const ProductCard = ({ products, bestSellers, saleProducts, category, showAllProducts }) => {
    // Add check for undefined or null products
    if (!products && !bestSellers && !saleProducts) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600">No products available</p>
            </div>
        );
    }

    const renderProductCard = (product) => (
        <div key={product._id} className='w-full max-w-[300px] mx-auto border-b-black rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
            <div>
                {/* product image */}
                <div className='rounded-t-lg overflow-hidden group relative'>
                    <img
                        src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-image.jpg'}
                        className='w-full h-[270px] sm:h-[300px] md:h-[350px] object-cover group-hover:scale-125 transition-all duration-500'
                        alt={product.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg';
                        }}
                    />
                    <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-300'></div>

                    {/* hidden button */}
                    <Link
                        to={`/product/${product._id}`}
                        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'
                    >
                        <button className='bg-gray-800 cursor-pointer text-xl text-white font-semibold font-comic border-black py-2 px-3 rounded-lg'>
                            View Details
                        </button>
                    </Link>
                </div>

                {/* product details */}
                <div className='mt-2 p-2 md:p-4'>
                    <h3 className='font-comic text-xl md:text-2xl text-center font-bold'>{product.name}</h3>
                    <h5 className='text-center text-sm md:text-base text-gray-500'>{product.notes}</h5>
                    <h5 className='text-center text-sm md:text-base text-gray-500'>({product.category}) - {product.sizes?.[0]}</h5>

                    <div className='h-8 flex items-center justify-center'>
                        {product.bestSeller && (
                            <p className='text-center text-red-600'>Best Seller</p>
                        )}
                    </div>

                    <div className='flex justify-between items-center m-2 md:m-3 text-base md:text-xl'>
                        <div className='flex gap-1'>
                            {product.salePrice ? (
                                <>
                                    <div className='flex items-center gap-2'>
                                        <p className='line-through text-gray-600 text-sm md:text-base'>{product.price} Rs.</p>
                                        <span className='text-lg md:text-xl font-semibold'>{product.salePrice} Rs.</span>
                                    </div>
                                </>
                            ) : (
                                <span className='text-lg md:text-xl font-semibold'>{product.price} Rs.</span>
                            )}
                        </div>
                        <p>{product.sizes?.length || 1} sizes</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // If showAllProducts is true, show all products in a grid
    if (showAllProducts) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 p-4 md:p-10">
                {products.map(renderProductCard)}
            </div>
        );
    }

    // If category exists, show only category products
    if (category) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 p-4 md:p-10">
                {products.map(renderProductCard)}
            </div>
        );
    }

    // If no category and not showing all products, show best sellers and grab the deal sections
    return (
        <div>
            {/* Best Sellers Section */}
            {bestSellers && bestSellers.length > 0 && (
                <>
                    <div className='font-comic text-center mt-4 md:mt-10'>
                        <h2 className='text-3xl md:text-4xl lg:text-6xl font-semibold inline-block relative'>
                            Our Best Sellers
                            <span className="block h-[2px] w-[200px] md:w-[300px] lg:w-[450px] bg-black mt-2 mx-auto"></span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 p-4 md:p-10">
                        {bestSellers.map(renderProductCard)}
                    </div>
                </>
            )}

            {/* Sale Products Section */}
            {saleProducts && saleProducts.length > 0 && (
                <>
                    <div className='font-comic text-center mt-6 md:mt-10'>
                        <h2 className='text-3xl md:text-4xl lg:text-6xl font-semibold inline-block relative'>
                            Grab The Deal
                            <span className="block h-[2px] w-[200px] md:w-[300px] lg:w-[450px] bg-black mt-2 mx-auto"></span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 p-4 md:p-10">
                        {saleProducts.map(renderProductCard)}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductCard
