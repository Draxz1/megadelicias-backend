const pool = require('../db/connection');

const Mesa = {
  async listar() {
    const [rows] = await db.execute('SELECT * FROM mesas');
    return rows;
  },

  async actualizarEstado(id, estado) {
    await db.execute('UPDATE mesas SET estado = ? WHERE id = ?', [estado, id]);
  }
};

module.exports = Mesa;
