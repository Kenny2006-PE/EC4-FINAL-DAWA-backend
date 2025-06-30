const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_super_seguro_2024';

// Registro de usuario
exports.registro = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ 
        error: 'Ya existe un usuario con ese email' 
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password,
      rol: rol || 'usuario'
    });

    // Generar token
    const token = jwt.sign(
      { 
        id: nuevoUsuario.id, 
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    // Verificar password
    const passwordValido = await usuario.verificarPassword(password);
    if (!passwordValido) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    // Generar token
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email,
        rol: usuario.rol 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener perfil del usuario autenticado
exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ['id', 'nombre', 'email', 'rol', 'createdAt']
    });

    res.json(usuario);
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar perfil
exports.actualizarPerfil = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const usuario = await Usuario.findByPk(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.update({ nombre, email });

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    });

  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
