const express = require('express');
const router = express.Router();
const controller = require('../controllers/productosController');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de productos requieren autenticación
router.get('/productos', verificarToken, controller.getProductos);
router.get('/productos/:id', verificarToken, controller.getProducto);
router.post('/productos', verificarToken, controller.createProducto);
router.put('/productos/:id', verificarToken, controller.updateProducto);
router.delete('/productos/:id', verificarToken, controller.deleteProducto);

module.exports = router;
