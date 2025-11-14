import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";

export default function NavBar() {
  const [categories, setCategories] = useState([]);

  // 🔥 Traemos las categorías desde Firebase
  useEffect(() => {
    const productsRef = collection(db, "products"); // 👈 nombre de tu colección

    getDocs(productsRef)
      .then((snapshot) => {
        // Creamos un array con todas las categorías sin repetir
        const allProducts = snapshot.docs.map((doc) => doc.data());
        const uniqueCategories = [...new Set(allProducts.map((p) => p.category))]; // 👈 asegúrate que el campo se llama "category"
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
      });
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#ffb6c1",
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        Kawaii Plush
      </Link>

      {/* Menú dinámico */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "15px",
          margin: 0,
        }}
      >
        {categories.map((cat) => (
          <li key={cat}>
            <NavLink
              to={`/category/${cat}`}
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#fff",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              {cat}
            </NavLink>
          </li>
        ))}
      </ul>

      <CartWidget />
    </nav>
  );
}
