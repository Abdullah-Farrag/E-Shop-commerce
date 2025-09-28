import React from "react";
import { Product } from "../types/Product";
import styles from "../styles/ProductModal.module.scss";
import { motion } from "framer-motion";

interface Props {
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose, onAddToCart }) => {
    if (!product) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <motion.div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
            >
                <button className={styles.close} onClick={onClose}>✕</button>
                <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} className={styles.image} />
                <h2>{product.name}</h2>
                <p className={styles.fullDescription}>{product.fullDescription}</p>
                <p className={styles.price}>
                    {product.price.toFixed(2)} {product.currency}
                </p>
                <button
                    className={styles.addBtn}
                    onClick={() => product.inStock && onAddToCart?.(product)}
                    disabled={!product.inStock}
                >
                    {product.inStock ? "Add to Cart" : "Not Available"}
                </button>


            </motion.div>
        </div>
    );
};

export default ProductModal;
