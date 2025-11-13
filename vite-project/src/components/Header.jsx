import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  // Estado para abrir o cerrar el menú en móviles
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <h1>🎮 GameTracker</h1>
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`} >
        <ul>
          <Link to="/">Inicio</Link>
          <Link to="/reseñas">Reseñas</Link>
          <Link to="/añadir-juego">Añadir Juego</Link>
          <Link to="/añadir-reseña">Añadir Reseña</Link>
          <Link to="/dashboard">Dashboard</Link>
        </ul>
      </nav>

      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
