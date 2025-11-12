import  express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Juego from './modeloJuego.js'

//método GET: obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los juegos" });
  }
});

//método GET: obtener juego por ID
router.get('/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) {
      return res.status(404).json({ mensaje: "Juego no encontrado" }); 
    }
      res.json(juego);
    } catch (error) {
      res.status(400).json({mensaje: "ID no válido"});
    }
});

//método POST
router.post('/', async (req, res) => {
 try {
  const nuevoJuego = await Juego.create(req.body);
  res.status(201).json({mensaje: "Juego creado exitosamente"}, nuevoJuego);
 } catch (error) {
  res.status(400).json({mensaje: "Error al crear el juego"});
 }
});

//método PUT
router.put('/:id', async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!juegoActualizado) {
      return res.status(404).json({mensaje: "Juego no encontrado"});
    }
    res.json({mensaje: "Información actualizada exitosamente"}, juegoActualizado);
  } catch (error) {
    res.status(400).json({mensaje: "ID no válido"});
  }
});

//método DELETE
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Juego.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({mensaje: "Juego no encontrado"});
    }
    res.json({mensaje: "Juego eliminado"});
  } catch {
    res.status(400).json({mensaje: "ID no válido"})
  }
});

//exportación del módulo
export default router;