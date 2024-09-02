import Conferencistas from "../models/Conferencistas.js";
import { Types } from "mongoose";



const getAllConferencistas = async (req, res) => {
    try {
        const conferencistas = await Conferencistas.find();
        res.json(conferencistas);
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });
        console.log(error);
        
    }
};


const getConferencistaById = async (req, res) => {
    const { id } = req.params;
    try {
        const conferencista = await Conferencistas.findById(id);
        if (!conferencista) {
            return res.status(404).json({ res: 'Conferencista no encontrado' });
        }
        res.json(conferencista);
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });
    }
};


const registrarConferencista = async (req, res) => {
    const { email } = req.body;
    try {
        if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })
        if (await Conferencistas.findOne({ email })) return res.status(400).json({ res: 'El email ya se encuentra registrado' })


        const conferencista = new Conferencistas(req.body);
        await conferencista.save();
        res.status(201).json(conferencista);
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });
        log(error);
    }
};


const actualizarConferencista = async (req, res) => {
    const { id } = req.params;
    
    try {
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ res: `ID ${id} no válido` })
    if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })

        const conferencista = await Conferencistas.findByIdAndUpdate(
            id,
            req.body
        );
        if (!conferencista) {
            return res.status(404).json({ res: 'Conferencista no encontrado' });
        }
        res.status(200).json({res: `Conferencista actualizado correctamente ${conferencista}`});
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });
        console.log(error);
        
    }
};


const eliminarConferencista = async (req, res) => {
    const { id } = req.params;
    try {
        const conferencista = await Conferencistas.findByIdAndDelete(id);
        if (!conferencista) {
            return res.status(404).json({ res: 'Conferencista no encontrado' });
        }
        res.json({ res: 'Conferencista eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ res: 'Error del servidor' });
        console.log(error);
        
    }
};

export{
    getAllConferencistas,
    getConferencistaById,
    registrarConferencista,
    actualizarConferencista,
    eliminarConferencista,
};