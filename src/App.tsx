import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import "./index.scss";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
