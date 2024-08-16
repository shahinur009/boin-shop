
const ProductCard = ({ item }) => {
    const { productName, productImage, description, price, category, ratings, creationDateTime, brandName } = item
    return (
        <>
            <div className="max-w-sm p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
                <img src={productImage} alt="" className="object-cover object-center w-full rounded-md h-72 overflow-hidden transition-transform duration-300 hover:scale-105" />
                <div className="mt-6 mb-2">
                    <div className="flex justify-between">
                        <span className="block p-1 rounded-md text-xs font-medium tracking-widest uppercase bg-pink-500">Price: {price}</span>
                        <span className="block p-1 rounded-md text-xs font-medium tracking-widest uppercase bg-pink-500">Rating: {ratings}</span>
                    </div>

                    <h2 className="text-xl font-semibold tracking-wide">{productName}</h2>
                </div>
                <p className="dark:text-gray-800">{description}</p>
                <div className="flex justify-between mt-2 flex-wrap gap-2 uppercase">
                    <p className="border-2 p-1 rounded-md">Category: {category}</p>
                    <p className="border-2 p-1 rounded-md">Brand: {brandName}</p>
                    <p className="border-2 p-1 rounded-md">Posting Date: {creationDateTime}</p>

                </div>
            </div>
        </>
    );
};

export default ProductCard;