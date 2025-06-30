const express = require('express');
const cors = require('cors');
const { db } = require('./models');
const productoRoutes = require('./routes/producto.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', productoRoutes);
app.use('/api', categoriaRoutes);
app.use('/api/auth', authRoutes);

db.sync({ force: true }).then(() => {
  console.log('✅ Tablas sincronizadas desde cero');
  app.listen(3001, () => console.log('Servidor en puerto 3001'));
}).catch(err => console.error('Error al sincronizar:', err));
