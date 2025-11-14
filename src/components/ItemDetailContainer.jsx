import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../service/Firebase"; 
import { doc, getDoc } from "firebase/firestore";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext.jsx";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  // ✅ Estado para el mensaje de éxito
  const [successMsg, setSuccessMsg] = useState("");

  // Función para agregar al carrito y mostrar mensaje (MOVIDA AL INICIO)
  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    setSuccessMsg(`¡Agregaste ${quantity} ${product.name}(s) al carrito!`);

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  useEffect(() => {
    // ⚠️ CORRECCIÓN: Asumo que la colección en Firebase es 'products' (minúscula)
    // según convenciones, pero mantenemos 'Products' si es así
    const docRef = doc(db, "Products", id); 
    
    getDoc(docRef).then((res) => {
      if (res.exists()) {
        setProduct({ id: res.id, ...res.data() });
      }
    });
  }, [id]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Cargando...</h2>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", height: "300px", objectFit: "cover" }}
      />
      <h2>${product.price}</h2>
      <p>{product.description}</p>

      {/* ItemCount usa la función corregida */}
      <ItemCount stock={10} initial={1} onAdd={handleAddToCart} />

      {/* Mensaje de éxito */}
      {successMsg && (
        <p style={{ marginTop: "15px", color: "#ff1493", fontWeight: "bold" }}>
          {successMsg}
        </p>
      )}
    </div>
  );
}