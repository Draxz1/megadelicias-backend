const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Inicializar app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth.routes');
const platoRoutes = require('./routes/plato.routes'); // Asegúrate de que este archivo existe
const userRoutes = require('./routes/user.routes');
app.use('/api/usuarios', userRoutes);
const contabilidadRoutes = require('./routes/contabilidad.routes');
app.use('/api/contabilidad', contabilidadRoutes);

const cajaRoutes = require('./routes/caja.routes');
const meseroRoutes = require('./routes/mesero.routes');

app.use('/api/caja', cajaRoutes);
app.use('/api/mesero', meseroRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/platos', platoRoutes);




// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
