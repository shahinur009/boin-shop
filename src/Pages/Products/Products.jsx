import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useLoaderData } from "react-router-dom";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortByPrice, setSortByPrice] = useState(null);
    const [sortByDate, setSortByDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const { count } = useLoaderData();
    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        const fetchBrandsAndCategories = async () => {
            try {
                const response = await fetch('https://boin-shop-server.vercel.app/products');
                const data = await response.json();

                const uniqueBrands = [...new Set(data.map(item => item.brandName))];
                setBrands(uniqueBrands);

                const uniqueCategories = [...new Set(data.map(item => item.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching brands and categories:', error);
            }
        };

        fetchBrandsAndCategories();
    }, []);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const sortQuery = sortByPrice !== null
                    ? `sortBy=price&order=${sortByPrice ? 'asc' : 'desc'}`
                    : sortByDate !== null
                        ? `sortBy=date&order=${sortByDate ? 'asc' : 'desc'}`
                        : '';

                const searchQuery = searchTerm ? `&search=${searchTerm}` : '';
                const brandQuery = brand ? `&brand=${brand}` : '';
                const categoryQuery = category ? `&category=${category}` : '';
                const priceQuery = (minPrice && maxPrice) ? `&minPrice=${minPrice}&maxPrice=${maxPrice}` : '';

                const response = await fetch(`https://boin-shop-server.vercel.app/products?page=${currentPage}&size=${itemsPerPage}&${sortQuery}${searchQuery}${brandQuery}${categoryQuery}${priceQuery}`);
                const data = await response.json();

                setProduct(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, itemsPerPage, sortByPrice, sortByDate, searchTerm, brand, category, minPrice, maxPrice]);

    return (
        <>
            <div>
                <div className="md:flex justify-center gap-3 md:mx-10 mx-3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="input outline bg-pink-200 md:w-1/2 w-full"
                    />

                    <select
                        onChange={(e) => {
                            const value = e.target.value;
                            setSortByPrice(value === 'price-asc' ? true : value === 'price-desc' ? false : null);
                            setSortByDate(value === 'date-new' ? true : value === 'date-old' ? false : null);
                        }}
                        className="select outline bg-pink-200 md:w-1/2 w-full md:mt-0 mt-2"
                    >
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="date-new">New Products</option>
                        <option value="date-old">Old Products</option>
                    </select>
                </div>

                <div className="md:flex justify-center items-center md:mx-10 mx-3 gap-3 mt-3">
                    <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="select outline bg-pink-200 md:w-1/4 w-1/2 mb-2"
                    >
                        <option value="">All Brands</option>
                        {brands.map(brand => (
                            <option value={brand} key={brand}>{brand}</option>
                        ))}
                    </select>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select outline bg-pink-200 md:w-1/4 w-1/2"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min Price"
                        className="input outline bg-pink-200 md:w-1/4 w-1/2"
                    />

                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max Price"
                        className="input md:w-1/4 w-1/2 outline bg-pink-200"
                    />

                </div>

                <div className="flex mx-auto mt-3">
                    <h1 className="text-pink-600 font-bold md:text-5xl text-xl mx-auto uppercase"><span className="text-black">A</span>ll Pro<span className="text-black">d</span>ucts</h1>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 px-6 my-10">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        product.map(item => <ProductCard item={item} key={item._id} />)
                    )}
                </div>

                <div className="flex mb-4 justify-center gap-10">
                    <button onClick={handlePrevPage} className="btn">Prev</button>
                    {pages.map(page => (
                        <button
                            className={currentPage === page ? 'bg-pink-500 btn' : undefined}
                            onClick={() => setCurrentPage(page)}
                            key={page}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={handleNextPage} className="btn">Next</button>
                </div>
            </div>
        </>
    );
};

export default Products;
