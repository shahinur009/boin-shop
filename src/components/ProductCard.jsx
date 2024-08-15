
const ProductCard = ({ item }) => {
    const { productName, productImage, description, price, category, ratings, creationDateTime, brandName } = item
    return (
        <div>
            <div className="card bg-base-100 md:w-96 card-compact shadow-xl min-h-screen   ">
                <figure className="overflow-hidden">
                    <img className="object-cover w-full md:h-96 min-h-80 mt-2 transition-transform duration-300 hover:scale-105"
                        src={productImage}
                        alt="product image" />
                </figure>
                <div className="card-body">
                    <h2 className="md:card-title text-[16px] font-semibold">
                        {productName}
                        <div className="badge bg-pink-500 text-white ml-2">Rating: {ratings}</div>
                    </h2>
                    <p>{description}</p>
                    <div className="card-actions justify-center">
                        <div className="badge badge-outline">Brand: {brandName}</div>
                        <div className="badge badge-outline">Price: {price}</div>
                        <div className="badge badge-outline">Category: {category}</div>
                        <div className="badge badge-outline">Posting Date:{creationDateTime}</div>
                    </div>
                    <button className="btn btn-sm bg-pink-500 hover:bg-pink-400">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;