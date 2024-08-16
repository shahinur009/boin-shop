import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useLoaderData } from "react-router-dom";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortByPrice, setSortByPrice] = useState(null); // null: no sort, true: asc, false: desc
    const [sortByDate, setSortByDate] = useState(null); // null: no sort, true: new to old, false: old to new
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const { count } = useLoaderData();
    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    // previous button handler
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // next button handler
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        let sortQuery = '';
        if (sortByPrice !== null) {
            sortQuery = `sortBy=price&order=${sortByPrice ? 'asc' : 'desc'}`;
        } else if (sortByDate !== null) {
            sortQuery = `sortBy=date&order=${sortByDate ? 'asc' : 'desc'}`;
        }

        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}&${sortQuery}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            });
    }, [currentPage, itemsPerPage, sortByPrice, sortByDate]);

    return (
        <>
            <div>
                <button
                    onClick={() => {
                        setSortByPrice(!sortByPrice);
                        setSortByDate(null); // Disable date sorting when price sorting is active
                    }}
                    className="btn bg-pink-500">
                    {sortByPrice ? 'Price: High to Low' : 'Price: Low to High'}
                </button>
                <button
                    onClick={() => {
                        setSortByDate(!sortByDate);
                        setSortByPrice(null); // Disable price sorting when date sorting is active
                    }}
                    className="btn bg-pink-500">
                    {sortByDate ? 'New to Old' : 'Old to New'}
                </button>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 px-6 my-10">
                    {product.map(item => <ProductCard item={item} key={item._id}></ProductCard>)}
                </div>
                <div className="flex mb-4 justify-center gap-10">
                    <button onClick={handlePrevPage} className="btn">Prev</button>
                    {pages.map(page => (
                        <button
                            className={currentPage === page ? 'bg-pink-500 btn' : undefined}
                            onClick={() => setCurrentPage(page)}
                            key={page}>
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
