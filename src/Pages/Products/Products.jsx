import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../../components/ProductCard";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
    }, [])


    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 px-6 my-10">
                {
                    product.map(item => <ProductCard item={item} key={item._id}></ProductCard>)
                }
            </div>
        </>
    );
};

export default Products;