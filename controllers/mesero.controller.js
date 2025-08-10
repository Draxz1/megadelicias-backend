const pool = require('../db/connection');

exports.obtenerPlatos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM platos');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener platos:', error);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.crearOrden = async (req, res) => {
  const { detalles } = req.body;
  const usuario_id = req.user.id; // ✅ CORREGIDO

  try {
    const [orden] = await pool.query('INSERT INTO ordenes (usuario_id) VALUES (?)', [usuario_id]);
    const orden_id = orden.insertId;

    for (const item of detalles) {
      await pool.query(
        'INSERT INTO orden_detalles (orden_id, plato_id, cantidad) VALUES (?, ?, ?)',
        [orden_id, item.plato_id, item.cantidad]
      );
    }

    res.status(201).json({ message: 'Orden creada exitosamente' });
  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.listarOrdenes = async (req, res) => {
  const usuario_id = req.user.id; // ✅ CORREGIDO
  try {
    const [ordenes] = await pool.query(
      `SELECT o.id, o.estado, o.fecha, GROUP_CONCAT(p.nombre, ' x', od.cantidad SEPARATOR ', ') AS platos
       FROM ordenes o
       JOIN orden_detalles od ON o.id = od.orden_id
       JOIN platos p ON od.plato_id = p.id
       WHERE o.usuario_id = ?
       GROUP BY o.id
       ORDER BY o.fecha DESC`,
      [usuario_id]
    );
    res.json(ordenes);
  } catch (error) {
    console.error('Error al listar órdenes:', error);
    res.status(500).json({ message: 'Error interno' });
  }
};
