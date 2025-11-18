import React from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";

function ReviewCard({ _id, juegoId, idJuego, textoReseña, puntuacion, dificultad, horasJugadas, recomendaria, fechaCreacion }) {
    const navigate = useNavigate();
    const handleDelete = async (_id) => {
  try {
    await fetch(`http://localhost:3000/api/resenas/${_id}`, { method: "DELETE" } );
    alert("Reseña eliminado correctamente");
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
};
return (
<div className="review-card">
<p className="review-game">Id de la reseña: {_id}</p>
<p className="review-game">Nombre del Juego: {juegoId}</p>
<p className="review-game">Id del juego: {idJuego}</p>
<div className="review-stars">
<p>Puntuación: </p>
{"★".repeat(puntuacion)}
{"☆".repeat(5 - puntuacion)}
</div>
<p className="review-text">{textoReseña}</p>
<p className="review-hours">Horas jugadas: {horasJugadas}h</p>
<p className="review-difficulty">Dificultad: {dificultad}</p>
<p className="review-recommend">
Recomendaría: {recomendaria ? "Sí" : "No"}
</p>
<p className="review-date">Fecha: {fechaCreacion}</p>
<div className="review-buttons">
<button className="btn-edit-review" onClick={() => navigate(`/addReview`)}>Editar</button>
<button className="btn-delete-review" onClick={() => handleDelete(_id)}>Eliminar</button>
</div>
</div>
);
}

export default ReviewCard;