// src/components/RviewForm.jsx
import { useState } from "react";
import "../App.css"; // Importación del estilo separado

const ReviewForm = () => {
  // Estados del formulario
  const [_id, set_Id] = useState("");
  const [juegoId, setJuegoId] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [textoReseña, setTextoReseña] = useState("");
  const [horasJugadas, setHorasJugadas] = useState("");
  const [dificultad, setDificultad] = useState("");
  const [recomendaria, setRecomendaria] = useState(false);

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaReseña = {
        _id,
        juegoId,
        puntuacion,
        textoReseña,
        horasJugadas,
        dificultad,
        recomendaria,
    };

    try {
      const respuesta = await fetch("http://localhost:3000/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaReseña),
      });

      if (!respuesta.ok) {
        throw new Error("Error al crear la reseña");
      }

      alert("¡Reseña creada exitosamente!");
      // Limpia el formulario
      set_Id("");
      setJuegoId("");
      setPuntuacion(0);
      setTextoReseña("");
      setHorasJugadas("");
      setDificultad("");
      setRecomendaria(false);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al crear la reseña");
    }
  };

  // Actualizar una reseña existente
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!_id) return alert("Por favor, ingresa el ID de la reseña a actualizar");
    set_Id(_id);
    setJuegoId(juegoId);
    setPuntuacion(puntuacion);
    setTextoReseña(textoReseña);
    setHorasJugadas(horasJugadas);
    setDificultad(dificultad);
    setRecomendaria(recomendaria);

    try {
      const res = await fetch(`http://localhost:3000/api/resenas/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaReseña),
      });

      const data = await res.json();
      alert(`Reseña actualizada`);
      // Limpia el formulario
      set_Id("");
      setJuegoId("");
      setPuntuacion(0);
      setTextoReseña("");
      setHorasJugadas("");
      setDificultad("");
      setRecomendaria(false);
      setResena(data);
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
    }
  };

  // Renderiza una estrella llena o vacía dependiendo de la puntuación
  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const valor = index + 1;
      return (
        <span
          key={valor}
          className={`star ${valor <= puntuacion ? "filled" : ""}`}
          onClick={() => setPuntuacion(valor)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="review-form-container">
      <h2 className="review-form-title">Crear Reseña</h2>

      <form className="review-form">
        {/* ID del Juego */}
        <div className="form-group">
          <label>ID del Juego</label>
          <input
            type="text"
            value={juegoId}
            onChange={(e) => setJuegoId(e.target.value)}
            placeholder="Ej. 1"
            required
          />
        </div>
        <div className="form-group">
          <label>ID de la reseña (para actualizar)</label>
          <input
            type="text"
            value={_id}
            onChange={(e) => set_Id(e.target.value)}
            placeholder="Ej. 1"
          />
        </div>

        {/* Puntuación con estrellas */}
        <div className="form-group">
          <label>Puntuación</label>
          <div className="stars-container">{renderStars()}</div>
        </div>

        {/* Comentarios */}
        <div className="form-group">
          <label>Comentario</label>
          <textarea
            value={textoReseña}
            onChange={(e) => setTextoReseña(e.target.value)}
            placeholder="Escribe tu reseña..."
            required
          ></textarea>
        </div>

        {/* Horas Jugadas */}
        <div className="form-group">
          <label>Horas Jugadas</label>
          <input
            type="number"
            value={horasJugadas}
            onChange={(e) => setHorasJugadas(e.target.value)}
            placeholder="Ej. 10"
            required
          />
        </div>

        {/* Dificultad */}
        <div className="form-group">
          <label>Dificultad</label>
          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        {/* Recomendaría */}
        <div className="form-group checkbox-group">
          <label>¿Recomendaría?</label>
          <input
            type="checkbox"
            checked={recomendaria}
            onChange={(e) => setRecomendaria(e.target.checked)}
          />
        </div>

        <button type="button" className="submit-btn" onClick={handleSubmit}>
          Guardar Reseña
        </button>
        <button type="button" className="submit-btn" onClick={handleUpdate}>
          Actualizar Reseña
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
