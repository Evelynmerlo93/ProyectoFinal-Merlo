// src/components/CartItem.jsx
import React from "react";

export default function CartItem({ item, onRemove }) {
  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <li
      style={{
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px",
        borderRadius: "10px",
        background: "#fff7fb",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "72px", height: "72px", objectFit: "cover", borderRadius: "8px" }}
      />

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "700", color: "#6b4226" }}>{item.name}</div>
        <div style={{ fontSize: "14px", color: "#4a4a4a", marginTop: "6px" }}>
          {item.quantity} × ${Number(item.price).toFixed(2)}
        </div>
      </div>

      <div style={{ textAlign: "right", minWidth: "110px" }}>
        <div style={{ fontWeight: "700", color: "#ff7b54" }}>${subtotal}</div>
        <button
          onClick={() => onRemove(item.id)}
          aria-label={`Eliminar ${item.name}`}
          style={{
            marginTop: "8px",
            background: "#ff69b4",
            border: "none",
            color: "#fff",
            borderRadius: "6px",
            padding: "6px 8px",
            cursor: "pointer",
          }}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
