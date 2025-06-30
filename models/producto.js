const { DataTypes } = require('sequelize');
const db = require('../db');
const Categoria = require('./categoria');

const Producto = db.define('Producto', {
  nombre: DataTypes.STRING,
  precio: DataTypes.DECIMAL(10, 2),
  stock: DataTypes.INTEGER,
  categoriaId: DataTypes.INTEGER
});

Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = Producto;
