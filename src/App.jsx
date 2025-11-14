import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout"; 
import Footer from "./components/Footer.jsx"; 

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="¡Bienvenido a Kawaii Plush Store! 🧸✨" />}
          />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                404 - Página no encontrada 😿
              </h2>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
