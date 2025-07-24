// models/contabilidad.model.js
const pool = require('../db/connection');


const Contabilidad = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM libro_diario ORDER BY fecha DESC');
    return rows;
  },

  create: async (transaccion) => {
    const { fecha, descripcion, debe, haber } = transaccion;
    const [result] = await db.query(
      'INSERT INTO libro_diario (fecha, descripcion, debe, haber) VALUES (?, ?, ?, ?)',
      [fecha, descripcion, debe, haber]
    );
    return result.insertId;
  },

  update: async (id, transaccion) => {
    const { fecha, descripcion, debe, haber } = transaccion;
    await db.query(
      'UPDATE libro_diario SET fecha = ?, descripcion = ?, debe = ?, haber = ? WHERE id = ?',
      [fecha, descripcion, debe, haber, id]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM libro_diario WHERE id = ?', [id]);
  },
};

module.exports = Contabilidad;
