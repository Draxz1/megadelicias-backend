const Pedido = require('../models/Pedido');
const PedidoDetalle = require('../models/PedidoDetalle');
const Mesa = require('../models/Mesa');
const pool = require('../db/connection');

exports.crearOrden = (req, res) => {
  // tu lógica para la orden
  res.json({ message: 'Orden registrada' });
};

exports.crearPedido = async (req, res) => {
  try {
    const { mesa_id, mesero_id, detalles } = req.body;

    const pedidoId = await Pedido.crear({ mesa_id, mesero_id });

    for (const item of detalles) {
      await PedidoDetalle.agregar({
        pedido_id: pedidoId,
        plato_id: item.plato_id,
        cantidad: item.cantidad,
        notas: item.notas || ''
      });
    }

    await Mesa.actualizarEstado(mesa_id, 'ocupada');

    res.status(201).json({ message: 'Pedido registrado exitosamente' });
  } catch (error) {
    console.error('Error en crearPedido:', error);
    res.status(500).json({ message: 'Error al registrar el pedido' });
  }
};

exports.obtenerMesas = async (req, res) => {
  try {
    const mesas = await Mesa.listar();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las mesas' });
  }
};
