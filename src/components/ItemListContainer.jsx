import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../service/firebase"; 

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const productsRef = collection(db, "Products"); // 👈 corregido con P mayúscula

    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    getDocs(q)
      .then((snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("📦 Productos traídos desde Firebase:", productsData);
        setItems(productsData);
      })
      .catch((error) => {
        console.error("❌ Error al obtener productos:", error);
      });
  }, [categoryId]);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        {greeting || (categoryId ? `Categoría: ${categoryId}` : "Catálogo")}
      </h2>
      {items.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cargando productos...</p>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  );
}
