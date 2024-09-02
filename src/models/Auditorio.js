import mongoose, { model } from "mongoose";
const auditorioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    ubicacion: {
        type: String,
        require: true
    },
    capacidad: {
        type: Number,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    }, 
    conferencista: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Conferencista'
        }
    ]
})

export default mongoose.model('Auditorio', auditorioSchema);