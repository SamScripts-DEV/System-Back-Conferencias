import Reserva from "../models/Reserva.js";
import { Types } from "mongoose";


const obtenerReservas = async (req, res) => {
    try {

        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ res: 'Error al obtener las reservas' });
    }
};



const getReservabyId = async (req, res) => {
    try {
        const {id} = req.params;
        if (!Types.ObjectId.isValid(id)) return res.status(400).json({ res: `ID ${id} no válido` })
        const reserva = await Reserva.findById(req.params.id).populate('auditorio').populate('conferencista');
        if (!reserva) {
            return res.status(404).json({ res: 'Reserva no encontrada' });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ res: 'Error al obtener la reserva' });
    }
};


const crearReserva = async (req, res) => {
    try {
        const {conferencista, auditorio} = req.body;
        if (!Types.ObjectId.isValid(conferencista) || !Types.ObjectId.isValid(auditorio)) return res.status(400).json({ res: 'ID no válido' });
        if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' });
        const reserva = new Reserva(req.body);
        await reserva.save();
        res.status(201).json({res: 'Reserva registrada correctamente', reserva});
    } catch (error) {
        res.status(500).json({ res: 'Error al crear la reserva' });
        console.log(error);
        
    }
};


const actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Types.ObjectId.isValid(id)) return res.status(400).json({ res: `ID ${id} no válido` });
        if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' });
        const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reserva) {
            return res.status(404).json({ res: 'Reserva no encontrada' });
        }
        res.json({res: 'Reserva actualizada correctamente', reserva});
    } catch (error) {
        res.status(500).json({ res: 'Error al actualizar la reserva' });
    }
};

// Eliminar una reserva existente
const eliminarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndDelete(req.params.id);
        if (!reserva) {
            return res.status(404).json({ res: 'Reserva no encontrada' });
        }
        res.json({ res: 'Reserva eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ res: 'Error al eliminar la reserva' });
    }
};

export{
    obtenerReservas,
    getReservabyId,
    crearReserva,
    actualizarReserva,
    eliminarReserva,
};