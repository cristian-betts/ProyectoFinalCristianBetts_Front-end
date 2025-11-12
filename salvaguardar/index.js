import  express from 'express';
const app = express();
import cors from 'cors';
import { connectDB } from './database.js'
app.use(cors());
app.use(express.json());

// Llamamos la función para conectar la base de datos
connectDB();

// Importar el CRUD de juegos
import routes from './juegos.js';
import router  from './reseñas.js';
// Usar la ruta principal
app.use('/api/juegos', routes);
app.use('/api/reseñas', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});