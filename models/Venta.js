const pool = require('../db/connection');

const Venta = {
  crearVenta: async ({ total, metodo_pago, usuario_id }) => {
    const [result] = await pool.query(
      'INSERT INTO ventas (total, metodo_pago, usuario_id) VALUES (?, ?, ?)',
      [total, metodo_pago, usuario_id]
    );
    return result.insertId;
  }
};

module.exports = Venta;
