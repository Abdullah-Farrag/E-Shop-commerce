import React from "react";
import { useCart } from "../context/CartContext";
import styles from "../styles/Header.module.scss";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const { cartItems } = useCart();
    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/cart" className={styles.cartLink}>
                    🛒 Cart
                    {totalQty > 0 && <span className={styles.badge}>{totalQty}</span>}
                </Link>
            </nav>
        </header>
    );
};

export default Header;