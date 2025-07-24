const pool = require('../db/connection');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, correo, rol, creado_en FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    const hash = await bcrypt.hash(contraseña, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)',
      [nombre, correo, hash, rol]
    );

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, rol } = req.body;

    await pool.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ?',
      [nombre, correo, rol, id]
    );

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
