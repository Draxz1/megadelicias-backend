const pool = require('../db/connection');

const MovimientoCaja = {
  registrar: async ({ tipo, monto, descripcion, usuario_id }) => {
    await pool.query(
      'INSERT INTO movimiento_caja (tipo, monto, descripcion, usuario_id) VALUES (?, ?, ?, ?)',
      [tipo, monto, descripcion, usuario_id]
    );
  },

  obtenerTodos: async () => {
    const [rows] = await pool.query('SELECT * FROM movimiento_caja ORDER BY fecha DESC');
    return rows;
  }
};

module.exports = MovimientoCaja;
