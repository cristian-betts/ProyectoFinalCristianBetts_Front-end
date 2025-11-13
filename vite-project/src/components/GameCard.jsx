// Tarjeta de cada juego
import React from "react";
import "../App.css"; // Importa el archivo de estilos
/**
 * Componente que muestra una tarjeta individual de un juego.
 * Recibe las props: titulo, genero, descripcion e imagen.
 */
const GameCard = ({ titulo, id, genero, descripcion, imagen }) => {
  return (
    <div className="game-card">
      <img src={imagen} alt={titulo} className="game-image" />

      <div className="game-info">
        <h2 className="game-title">{titulo}</h2>
        <p className="game-id">ID: {id}</p>
        <p className="game-genre">{genero}</p>
        <p className="game-description">{descripcion}</p>
      </div>
    </div>
  );
};

export default GameCard;
