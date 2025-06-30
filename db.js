require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql', // o puedes usar process.env.DB_DIALECT si lo defines en .env
  host: process.env.DB_HOST,
  logging: false
});

db.authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL exitosa');
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err);
});

module.exports = db;
