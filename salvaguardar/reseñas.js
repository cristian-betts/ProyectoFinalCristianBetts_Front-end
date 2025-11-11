// Importamos express y mongoose
import express from'express';
import mongoose from 'mongoose';
const router = express.Router();

// Importamos el modelo de Juego para relacionarlo
import Juego from './juegos.js';

// Definimos el esquema de las reseñas
const reseñaSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Juego', // Se relaciona con el ID del juego
    required: true
  },
  puntuacion: {
    type: Number,
    required: true
  },
  textoReseña: {
    type: String,
    required: true
  },
  horasJugadas: {
    type: Number,
    required: false
  },
  dificultad: {
    type: String,
    required: false
  },
  recomendaria: {
    type: Boolean,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar automáticamente la fecha de actualización
reseñaSchema.pre('save', function (next) {
  this.fechaActualizacion = new Date();
  next();
});

// Creamos el modelo
const Reseña = mongoose.model('Reseña', reseñaSchema);

/*CRUD DE RESEÑAS*/

//Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const { juegoId, puntuacion, textoReseña, horasJugadas, dificultad, recomendaria } = req.body;
    // Verificamos que el juego exista antes de crear la reseña
    const juego = await Juego.findById(juegoId);
    if (!juego) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    const nuevaReseña = new Reseña({
      juegoId,
      puntuacion,
      textoReseña,
      horasJugadas,
      dificultad,
      recomendaria
    });
    await nuevaReseña.save();
    res.status(201).json(nuevaReseña);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Obtener todas las reseñas (con datos del juego)
router.get('/', async (req, res) => {
  try {
    const reseñas = await Reseña.find().populate('juegoId');
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Obtener una reseña por ID
router.get('/:id', async (req, res) => {
  try {
    const reseña = await Reseña.findById(req.params.id).populate('juegoId');
    if (!reseña) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(reseña);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Actualizar una reseña
router.put('/:id', async (req, res) => {
  try {
    const reseñaActualizada = await Reseña.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: new Date() },
      { new: true }
    );

    if (!reseñaActualizada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }

    res.json(reseñaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const reseñaEliminada = await Reseña.findByIdAndDelete(req.params.id);
    if (!reseñaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exportamos el router para usarlo en el index.js
export default router;
