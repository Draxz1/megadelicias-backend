// controllers/contabilidad.controller.js
const pool = require('../db/connection');

exports.getLibroDiario = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM libro_diario ORDER BY fecha DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones', error });
  }
};

exports.addTransaccion = async (req, res) => {
  const { fecha, descripcion, debe, haber } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO libro_diario (fecha, descripcion, debe, haber) VALUES (?, ?, ?, ?)',
      [fecha, descripcion, debe, haber]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar transacción', error });
  }
};

exports.updateTransaccion = async (req, res) => {
  const { id } = req.params;
  const { fecha, descripcion, debe, haber } = req.body;
  try {
    await db.query(
      'UPDATE libro_diario SET fecha = ?, descripcion = ?, debe = ?, haber = ? WHERE id = ?',
      [fecha, descripcion, debe, haber, id]
    );
    res.json({ message: 'Transacción actualizada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar transacción', error });
  }
};

exports.deleteTransaccion = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM libro_diario WHERE id = ?', [id]);
    res.json({ message: 'Transacción eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar transacción', error });
  }
};
