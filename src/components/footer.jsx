import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#ffb6c1",
        color: "#fff",
        textAlign: "center",
        padding: "30px 20px 10px 20px",
        borderTop: "5px solid",
        borderImage: "linear-gradient(to right, #ff69b4, #ff85c1) 1",
        marginTop: "auto",
      }}
    >
      {/* Redes sociales */}
      <div style={{ marginBottom: "15px", fontSize: "20px" }}>
        {[
          { icon: <FaInstagram />, link: "https://instagram.com" },
          { icon: <FaFacebook />, link: "https://facebook.com" },
          { icon: <FaTwitter />, link: "https://twitter.com" },
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", margin: "0 10px", transition: "0.3s", fontSize: "22px" }}
            onMouseOver={(e) => (e.target.style.color = "#ff1493")}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div style={{ fontSize: "14px" }}>
        © 2025 Kawaii Plush - Todos los derechos reservados
      </div>
    </footer>
  );
}
