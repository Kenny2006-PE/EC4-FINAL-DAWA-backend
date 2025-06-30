const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro_2024';

// Middleware para verificar token
exports.verificarToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Acceso denegado. Token requerido.' 
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Buscar usuario
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) {
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }

    req.usuario = decoded;
    next();

  } catch (error) {
    console.error('Error verificando token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware para verificar rol de admin
exports.verificarAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ 
      error: 'Acceso denegado. Se requieren permisos de administrador.' 
    });
  }
  next();
};

// Middleware opcional - no falla si no hay token
exports.verificarTokenOpcional = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const usuario = await Usuario.findByPk(decoded.id);
      if (usuario) {
        req.usuario = decoded;
      }
    }
    
    next();
  } catch (error) {
    // Si hay error, simplemente continúa sin usuario
    next();
  }
};
