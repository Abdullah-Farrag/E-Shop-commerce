import React from "react";
import { Product } from "../types/Product";
import styles from "../styles/ProductCard.module.scss";
import { motion } from "framer-motion";

interface Props {
    product: Product;
    onClick?: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onClick }) => {
    return (
        <motion.div
            className={styles.card}
            onClick={() => onClick?.(product)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className={styles.imageWrapper}>
                <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} className={styles.image} />
                {!product.inStock && <span className={styles.overlay}>Out of Stock</span>}
            </div>

            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.shortDescription}>{product.shortDescription}</p>
            <p className={styles.price}>
                {product.price.toFixed(2)} {product.currency}
            </p>
        </motion.div>
    );
};

export default ProductCard;