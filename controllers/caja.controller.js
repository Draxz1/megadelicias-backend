const Venta = require('../models/Venta');
const VentaDetalle = require('../models/VentaDetalle');
const MovimientoCaja = require('../models/MovimientoCaja');

exports.crearVenta = async (req, res) => {
  try {
    const { total, metodo_pago, usuario_id, detalles } = req.body;

    const ventaId = await Venta.crearVenta({ total, metodo_pago, usuario_id });

    for (const item of detalles) {
      await VentaDetalle.agregarDetalle({
        venta_id: ventaId,
        plato_id: item.plato_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario
      });
    }

    await MovimientoCaja.registrar({
      tipo: 'INGRESO',
      monto: total,
      descripcion: 'Venta registrada',
      usuario_id
    });

    res.status(201).json({ message: 'Venta registrada exitosamente' });
  } catch (error) {
    console.error('Error en crearVenta:', error);
    res.status(500).json({ message: 'Error al registrar la venta' });
  }
};

exports.listarMovimientos = async (req, res) => {
  try {
    const movimientos = await MovimientoCaja.obtenerTodos();
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener movimientos de caja' });
  }
};
