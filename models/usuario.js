const { DataTypes } = require('sequelize');
const db = require('../db');
const bcrypt = require('bcryptjs');

const Usuario = db.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario'),
    defaultValue: 'usuario'
  }
});

// Hook para encriptar password antes de guardar
Usuario.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(usuario.password, salt);
});

Usuario.beforeUpdate(async (usuario) => {
  if (usuario.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
  }
});

// Método para verificar password
Usuario.prototype.verificarPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Usuario;
