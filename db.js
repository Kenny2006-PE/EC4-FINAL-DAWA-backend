const { Sequelize } = require('sequelize');
const db = new Sequelize('bd_farmacia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
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
