const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM usuarios');
  res.json(rows);
});

// Crear usuario
router.post('/', async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;
  const creado_en = new Date();

  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contraseña, rol, creado_en) VALUES (?, ?, ?, ?, ?)',
    [nombre, correo, contraseña, rol, creado_en]
  );
  res.status(201).json({ id: result.insertId });
});

// Editar usuario
router.put('/:id', async (req, res) => {
  const { nombre, correo, rol } = req.body;
  await pool.query(
    'UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ?',
    [nombre, correo, rol, req.params.id]
  );
  res.sendStatus(200);
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
