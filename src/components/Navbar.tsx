import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "../styles/Navbar.module.scss";

const Navbar: React.FC = () => {
    const { cartItems } = useCart();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">E-Shop</Link>
            </div>
            <div className={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/cart">
                    Cart <span className={styles.badge}>{cartItems.length}</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;