import  express from 'express';
import router from express.Router();

//array inicial de juegos 
// juegos.js
const juegos = [
  {
    id: 1,
    titulo: "The Legend of Zelda: Breath of the Wild",
    genero: "Aventura",
    plataforma: "Nintendo Switch",
    añoLanzamiento: 2017,
    desarrollador: "Nintendo",
    imagenPortada: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/store/software/switch2/70010000096817/cfe9f8d674be958326d3ba11fc7598a4383e5c5d7809b6239ccac0783aac6cd8",
    descripcion: "Explora el mundo abierto de Hyrule.",
    completado: true,
    fechaCreacion: "8-11-2025"
  },
  {
    id: 2,
    titulo: "God of War",
    genero: "Acción",
    plataforma: "PlayStation",
    añoLanzamiento: 2018,
    desarrollador: "Santa Monica Studio",
    imagenPortada: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg/250px-God_of_War_Ragnar%C3%B6k_cover.jpg",
    descripcion: "Kratos viaja junto a su hijo Atreus en tierras nórdicas.",
    completado: false,
    fechaCreacion: "8-11-2025"
  }
];

//método GET: obtener todos los juegos
router.get('/', (req, res) => {
  res.json(juegos);
});

//método GET: obtener juego por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const juego = juegos.find(j => j.id === id);

  if (!juego) {
    return res.status(404).json({ mensaje: 'Juego no encontrado' });
  }

  res.json(juego);
});

//método POST
router.post('/', (req, res) => {
  const { titulo, genero, plataforma, añoLanzamiento, desarrollador, imagenPortada, descripcion, completado, fechaCreacion } = req.body;

  // Validar que todos los campos estén presentes
  if (!titulo || !genero || !plataforma || !añoLanzamiento || !desarrollador || !imagenPortada || !descripcion || !completado || !fechaCreacion) {
    return res.status(400).json({ mensaje: 'Faltan datos del juego' });
  }

  const nuevoJuego = {
    id: juegos.length + 1, // ID autoincremental
    titulo,
    genero,
    plataforma,
    añoLanzamiento,
    desarrollador, 
    imagenPortada, 
    descripcion, 
    completado, 
    fechaCreacion
  };

  juegos.push(nuevoJuego);
  res.status(201).json({ mensaje: 'Juego agregado exitosamente', juego: nuevoJuego });
});

//método PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, genero, plataforma, desarrollador, imagenPortada, descripcion, completado, fechaCreacion } = req.body;

  const juego = juegos.find(j => j.id === id);
  if (!juego) {
    return res.status(404).json({ mensaje: 'Juego no encontrado' });
  }

  // Solo se actualizan los campos que se envíen
  juego.titulo = titulo || juego.titulo;
  juego.genero = genero || juego.genero;
  juego.plataforma = plataforma || juego.plataforma;
  juego.desarrollador = desarrollador || juego.desarrollador;
  juego.imagenPortada = imagenPortada || juego.imagenPortada;
  juego.descripcion = descripcion || juego.descripcion;
  juego.completado = completado || juego.completado;
  juego.fechaCreacion = fechaCreacion || juego.fechaCreacion;

  res.json({ mensaje: 'Juego actualizado correctamente', juego });
});

//método DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = juegos.findIndex(j => j.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: 'Juego no encontrado' });
  }

  juegos.splice(indice, 1);
  res.json({ mensaje: 'Juego eliminado correctamente' });
});

//exportación del módulo
export default router;