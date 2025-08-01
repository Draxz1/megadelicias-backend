const pool = require('../db/connection');

const Pedido = {
  async crear({ mesa_id, mesero_id }) {
    const [result] = await db.execute(
      'INSERT INTO pedidos (mesa_id, mesero_id) VALUES (?, ?)',
      [mesa_id, mesero_id]
    );
    return result.insertId;
  }
};

module.exports = Pedido;
