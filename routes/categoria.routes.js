const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriasController');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de categorías requieren autenticación
router.get('/categorias', verificarToken, controller.getCategorias);
router.get('/categorias/:id', verificarToken, controller.getCategoria);
router.post('/categorias', verificarToken, controller.createCategoria);
router.put('/categorias/:id', verificarToken, controller.updateCategoria);
router.delete('/categorias/:id', verificarToken, controller.deleteCategoria);

module.exports = router;
