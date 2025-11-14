// src/components/CartPage.jsx
import React from "react";
import { useCart } from "../context/CartContext.jsx";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>🛒 Tu carrito está vacío</h2>
        <p style={{ color: "#666", marginTop: "8px" }}>
          Explora el catálogo y agrega productos.
        </p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              marginTop: "12px",
              background: "#ff7b54",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Ir al catálogo
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "16px" }}>Tu carrito</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeFromCart} />
        ))}
      </ul>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={clearCart}
            style={{
              background: "#dfd7e2ff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              color: "#6b4226",
              fontWeight: "700",
            }}
          >
            Vaciar carrito
          </button>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", color: "#666" }}>Total a pagar</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#ff7b54" }}>
            ${Number(totalPrice).toFixed(2)}
          </div>

          {/* Enlace al checkout */}
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <button
              style={{
                marginTop: "12px",
                width: "100%",
                maxWidth: "220px",
                background: "#ff69b4",
                border: "none",
                padding: "10px 16px",
                borderRadius: "10px",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "800",
              }}
            >
              Ir al checkout 💖
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
