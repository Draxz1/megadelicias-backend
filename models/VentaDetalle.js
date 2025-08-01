const pool = require('../db/connection');

const VentaDetalle = {
  agregarDetalle: async ({ venta_id, plato_id, cantidad, precio_unitario }) => {
    await pool.query(
      'INSERT INTO venta_detalles (venta_id, plato_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [venta_id, plato_id, cantidad, precio_unitario]
    );
  }
};

module.exports = VentaDetalle;
