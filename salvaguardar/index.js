import  express from 'express';
const app = express();
import cors from 'cors';
app.use(cors());
app.use(express.json());

// Importar el CRUD de juegos
import routes from './juegos.js';

// Usar la ruta principal
app.use('/api/juegos', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});