import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { Product } from "../types/Product";
import productsData from "../data/products.json";
import styles from "../styles/ProductList.module.scss";
import { useCart } from "../context/CartContext";

const ProductSkeleton: React.FC = () => (
    <div className={styles.card}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonTextSmall}></div>
    </div>
);

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [search, setSearch] = useState("");
    const [availability, setAvailability] = useState<"all" | "in" | "out">("all");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 12;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filtered.length / productsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setProducts(productsData);
            setFiltered(productsData);
            setLoading(false);
        }, 1200);
    }, []);

    useEffect(() => {
        if (loading) return;

        const timeout = setTimeout(() => {
            let results = products.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );

            if (availability === "in") {
                results = results.filter((p) => p.inStock);
            } else if (availability === "out") {
                results = results.filter((p) => !p.inStock);
            }

            if (minPrice !== "") {
                results = results.filter((p) => p.price >= Number(minPrice));
            }

            if (maxPrice !== "") {
                results = results.filter((p) => p.price <= Number(maxPrice));
            }

            setFiltered(results);
            setCurrentPage(1);
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, availability, minPrice, maxPrice, products, loading]);

    return (
        <>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as "all" | "in" | "out")}
                >
                    <option value="all">All Products</option>
                    <option value="in">In Stock</option>
                    <option value="out">Out of Stock</option>
                </select>

                <div className={styles.priceRange}>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) =>
                            setMinPrice(e.target.value ? Number(e.target.value) : "")
                        }
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(e.target.value ? Number(e.target.value) : "")
                        }
                    />
                </div>
            </div>

            <div className={styles.grid}>
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={setSelectedProduct}
                        />
                    ))
                ) : (
                    <div className={styles.emptyBox}>
                        <span className={styles.emptyIcon}>🛒</span>
                        <p>No products found</p>
                    </div>
                )}
            </div>

            {!loading && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {pageNumbers.map((num) => (
                        <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={currentPage === num ? styles.activePage : ""}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={(p) => {
                    addToCart(p);
                    setSelectedProduct(null);
                }}
            />
        </>
    );
};

export default ProductList;
