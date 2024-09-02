import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        default: () => Math.random().toString(36).substring(2, 8).toUpperCase(),
        unique: true,
        
    },
    descripcion: {
        type: String,
        required: true
    },
    auditorio:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auditorio',
        required: true
    }],
    conferencista: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conferencista',
        required: true
    }],
});

export default mongoose.model('Reserva', reservaSchema);