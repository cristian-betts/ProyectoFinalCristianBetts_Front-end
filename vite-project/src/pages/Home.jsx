// página de inicio
import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import "../App.css"; 

const Home = () => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/juegos");
        const data = await response.json();
        setJuegos(data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    fetchJuegos();
  }, []);

  return (
    <div className="home-container">
      <h1>🎮 Biblioteca Gamer</h1>
      <div className="game-grid">
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <GameCard
              id={juego._id}
              titulo={juego.titulo}
              genero={juego.genero}
              descripcion={juego.descripcion}
              imagen={juego.imagen}
            />
          ))
        ) : (
          <p>No hay juegos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

