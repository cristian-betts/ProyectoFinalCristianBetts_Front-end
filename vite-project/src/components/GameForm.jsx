// GameForm.jsx
import { useState } from "react";

// Componente para crear, actualizar o eliminar juegos
const GameForm = () => {
  // Estados del formulario
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [añoLanzamiento, setAñoLanzamiento] = useState("");
  const [desarrollador, setDesarrollador] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenPortada, setImagenPortada] = useState("");
  const [completado, setCompletado] = useState(false);
  const [id, setId] = useState("");

  // URL de tu API
  const apiUrl = "http://localhost:3000/api/juegos";

  // Crear un nuevo juego
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          genero,
          plataforma,
          añoLanzamiento,
          desarrollador,
          descripcion,
          imagenPortada,
          completado,
        }),
      });

      const data = await res.json();
      alert(`Juego creado: ${data.titulo}`);
      limpiarCampos();
    } catch (error) {
      console.error("Error al crear el juego:", error);
    }
  };

  // Actualizar un juego existente
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!id) return alert("Por favor, ingresa el ID del juego a actualizar");
    setTitulo(titulo);
    setGenero(genero);
    setPlataforma(plataforma);
    setAñoLanzamiento(añoLanzamiento);
    setDesarrollador(desarrollador);
    setDescripcion(descripcion);
    setImagenPortada(imagenPortada);
    setCompletado(completado);

    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          genero,
          añoLanzamiento,
          desarrollador,
          descripcion,
          imagenPortada,
          completado
        }),
      });

      const data = await res.json();
      alert(`Juego actualizado: ${data.titulo}`);
      limpiarCampos();
      setJuego(data);
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
    }
  };

  // Limpia todos los campos del formulario
  const limpiarCampos = () => {
    setTitulo("");
    setGenero("");
    setPlataforma("");
    setAñoLanzamiento("");
    setDesarrollador("");
    setDescripcion("");
    setImagenPortada("");
    setCompletado(false);
    setId("");
  };

  return (
    <div className="game-form-container">
      <h2>Gestión de Juegos</h2>

      <form className="game-form">
        <label>ID del juego (para actualizar)</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ej: 674b8e9d2345..."
        />

        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label>Género</label>
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />

        <label>Plataforma</label>
        <input
          type="text"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
          required
        />

        <label>Año de lanzamiento</label>
        <input
          type="number"
          value={añoLanzamiento}
          onChange={(e) => setAñoLanzamiento(e.target.value)}
          required
        />

        <label>Desarrollador</label>
        <input
          type="text"
          value={desarrollador}
          onChange={(e) => setDesarrollador(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label>URL de imagen</label>
        <input
          type="text"
          value={imagenPortada}
          onChange={(e) => setImagenPortada(e.target.value)}
          required
        />

        <label>
          <input
            type="checkbox"
            checked={completado}
            onChange={(e) => setCompletado(e.target.checked)}
          />
          Completado
        </label>

        <div className="form-buttons">
          <button type= "button" onClick={handleCreate}> Crear </button>
          <button type= "button" onClick={handleUpdate}>Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default GameForm;
