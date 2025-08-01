const pool = require('../db/connection');

const PedidoDetalle = {
  async agregar({ pedido_id, plato_id, cantidad, notas }) {
    await db.execute(
      'INSERT INTO pedido_detalle (pedido_id, plato_id, cantidad, notas) VALUES (?, ?, ?, ?)',
      [pedido_id, plato_id, cantidad, notas]
    );
  }
};

module.exports = PedidoDetalle;
