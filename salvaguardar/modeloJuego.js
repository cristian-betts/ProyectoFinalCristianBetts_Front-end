import mongoose from 'mongoose';

//modelo del juego
const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: {type: String, required: true },
  añoLanzamiento: {type: Number, required: true },
  desarrollador: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagenPortada: { type: String, required: true },
  completado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now()}
});

//creación del modelo
const Juego = mongoose.model('Juego', juegoSchema);

export default Juego;