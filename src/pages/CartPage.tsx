import React from "react";
import { useCart } from "../context/CartContext";
import styles from "../styles/CartPage.module.scss";
import { FaTrashAlt } from "react-icons/fa";
const TrashIcon: any = FaTrashAlt;

const CartPage: React.FC = () => {
    const { cartItems, increaseQty, decreaseQty, removeFromCart, clearCart, total } = useCart();

    if (cartItems.length === 0) {
        return <div className={styles.empty}>🛒 Your cart is empty</div>;
    }

    return (
        <div className={styles.cartPage}>
            <h2>Your Cart</h2>

            {/* Table view for larger screens */}
            <table className={`${styles.table} ${styles.desktopOnly}`}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(({ product, quantity }) => (
                        <tr key={product.id}>
                            <td className={styles.productCell}>
                                <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} className={styles.image} />
                                <span>{product.name}</span>
                            </td>
                            <td>{product.price.toFixed(2)} {product.currency}</td>
                            <td className={styles.qty}>
                                <div className={styles.qtyControls}>
                                    <button onClick={() => decreaseQty(product.id)}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => increaseQty(product.id)}>+</button>
                                </div>
                            </td>
                            <td>
                                {(product.price * quantity).toFixed(2)} {product.currency}
                            </td>
                            <td>
                                <button
                                    className={`${styles.removeBtn} ${styles.desktopOnlyRemove}`}
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    <TrashIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Card view for mobile */}
            <div className={`${styles.cardList} ${styles.mobileOnly}`}>
                {cartItems.map(({ product, quantity }) => (
                    <div className={styles.card} key={product.id}>
                        <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} className={styles.image} />
                        <div className={styles.details}>
                            <h3>{product.name}</h3>
                            <div className={styles.priceRow}>
                                <p>{product.price.toFixed(2)} {product.currency}</p>
                            </div>
                            <div className={styles.qty}>
                                <button onClick={() => decreaseQty(product.id)}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => increaseQty(product.id)}>+</button>
                            </div>
                            <div className={styles.subtotalRow}>
                                <p className={styles.subtotal}>
                                    Subtotal: {(product.price * quantity).toFixed(2)} {product.currency}
                                </p>
                                <button
                                    className={styles.mobileOnlyRemove}
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer with total and clear button */}
            <div className={styles.footer}>
                <h3>Grand Total: {total.toFixed(2)} {cartItems[0].product.currency}</h3>
                <button className={styles.clearBtn} onClick={clearCart}>
                    Clear Cart
                </button>
            </div>
        </div>
    );
};

export default CartPage;