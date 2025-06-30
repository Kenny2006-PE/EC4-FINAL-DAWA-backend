const { DataTypes } = require('sequelize');
const db = require('../db');

const Categoria = db.define('Categoria', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Categoria;
