
import Auditorio from "../models/Auditorio.js";
import mongoose, { Types } from "mongoose";




const registrarAuditorio = async (req, res) => {
    try {
        const {conferencista} = req.body;
        if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })
        if (!mongoose.Types.ObjectId.isValid(conferencista)) return res.status(400).json({ res: 'ID de conferencista no válido' });


        
        const auditorio = new Auditorio(req.body);
        await auditorio.save();
        res.status(201).json({res: 'Auditorio registrado correctamente', auditorio});
    } catch (error) {
        res.status(500).json({ res: 'Error en le servidor' });
        console.log(error);
        
    }
};


const getAllAuditorios = async (req, res) => {
    try {
        const auditorios = await Auditorio.find();
        res.json(auditorios);
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });
    }
};


const getAuditorioById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Types.ObjectId.isValid(id)) return res.status(400).json({ res: `ID ${id} no válido` })
        const auditorio = await Auditorio.findById(id).select('-conferencias').populate('conferencista', 'cedula nombre')

        if (!auditorio) {
            return res.status(404).json({ message: 'Auditorio no encontrado' });
        }
        res.json(auditorio);
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });
        console.log(error);
        
    }
};


const actualizarAuditorio = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Types.ObjectId.isValid(id)) return res.status(400).json({ res: `ID ${id} no válido` })
        if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })
        const updatedAuditorio = await Auditorio.findByIdAndUpdate(
            id,
            req.body
        );
        if (!updatedAuditorio) {
            return res.status(404).json({ res: 'Auditorio no encontrado' });
        }
        res.json(updatedAuditorio);
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });
    }
};

const eliminarAuditorio = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAuditorio = await Auditorio.findByIdAndDelete(id);
        if (!deletedAuditorio) {
            return res.status(404).json({ res: 'Auditorio no encontrado' });
        }
        res.json({ res: 'Auditorio eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });7
        console.log(error);
        
    }
};


export{
    registrarAuditorio,
    getAllAuditorios,
    getAuditorioById,
    actualizarAuditorio,
    eliminarAuditorio,
};