// Importamos express y mongoose
import express from'express';
import mongoose from 'mongoose';
const router = express.Router();

// Importamos el modelo de Juego para relacionarlo
import Juego from './modeloJuego.js';

// Definimos el esquema de las reseñas
const resenaSchema = new mongoose.Schema({
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
    required: true
  },
  dificultad: {
    type: String,
    required: true
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
resenaSchema.pre('save', function (next) {
  this.fechaActualizacion = new Date();
  next();
});

// Creamos el modelo
const Resena = mongoose.model('Resena', resenaSchema);

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
    const nuevaResena = new Resena({
      juegoId,
      puntuacion,
      textoReseña,
      horasJugadas,
      dificultad,
      recomendaria,
    });
    await nuevaResena.save();
    res.status(201).json(nuevaResena);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Obtener todas las reseñas (con datos del juego)
router.get('/', async (req, res) => {
  try {
    const resenas = await Resena.find().populate('juegoId');
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Obtener una reseña por ID
router.get('/:id', async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id).populate('juegoId');
    if (!resena) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(resena);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Actualizar una reseña
router.put('/:id', async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: new Date() },
      { new: true }
    );

    if (!resenaActualizada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }

    res.json(resenaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    if (!resenaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json({ mensaje: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exportamos el router para usarlo en el index.js
export default router;
