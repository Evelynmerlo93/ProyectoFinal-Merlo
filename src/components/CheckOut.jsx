import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../service/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor, completa todos los campos 💬");
      return;
    }

    // ARMAMOS LA ORDEN REAL
    const order = {
      buyer: { ...formData },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: totalPrice,
      date: serverTimestamp(), // FECHA AUTOMÁTICA FIREBASE
    };

    try {
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);

      setOrderId(docRef.id); // ID REAL DE FIREBASE
      clearCart();

    } catch (error) {
      console.error("❌ Error al crear la orden:", error);
    }
  };

  if (orderId) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2>🎉 ¡Gracias por tu compra!</h2>
        <p>Tu número de orden es:</p>
        <h3 style={{ color: "#ff7b54" }}>{orderId}</h3>
        <p>Recibirás un correo con los detalles 💌</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>🛒 No tienes productos en el carrito</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#fff7fb",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>🧾 Checkout</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre completo"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          Total a pagar: <strong>${Number(totalPrice).toFixed(2)}</strong>
        </div>

        <button
          type="submit"
          style={{
            background: "#ff7b54",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            padding: "12px 18px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Confirmar compra 💖
        </button>
      </form>
    </div>
  );
}
