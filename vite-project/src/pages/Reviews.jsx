import React, { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import "../App.css"

export default function Reviews() {
const [Resena, setResena] = useState([]);

// Cargar reseñas del juego
useEffect(() => {
const fetchResena = async () => {
try {
const res = await fetch(`http://localhost:3000/api/resenas`);
const data = await res.json();
setResena(data);
} catch (error) {
console.error("Error al cargar reseñas:", error);
}
};

fetchResena();
}, []);


return (
<div className="reviews-container">
<h2 className="reviews-title"> Reseñas del Juego</h2>


<div className="reviews-list">
{Resena.length > 0 ? (
Resena.map((Resena) => (
<ReviewCard 
_id={Resena._id}
idJuego={Resena.juegoId._id}
juegoId={Resena.juegoId.titulo} 
puntuacion={Resena.puntuacion}
textoReseña={Resena.textoReseña}
horasJugadas={Resena.horasJugadas}
recomendaria={Resena.recomendaria}
fechaCreacion={Resena.fechaCreacion} 
dificultad={Resena.dificultad}
/>
))
) : (
<p className="no-reviews">No hay reseñas registradas.</p>
)}
</div>
</div>
);
}