import {Router} from 'express'

import{
    obtenerReservas,
    getReservabyId,
    crearReserva,
    actualizarReserva,
    eliminarReserva,
}from '../controllers/reserva_controller.js'


import verificarAutenticacion from '../middlewares/Auth.js'

const router = Router()

router.get('/reservas', verificarAutenticacion, obtenerReservas)
router.get('/reserva/:id', verificarAutenticacion, getReservabyId)
router.post('/reserva/registro', verificarAutenticacion, crearReserva)
router.put('/reserva/actualizacion/:id', verificarAutenticacion, actualizarReserva)
router.delete('/reserva/eliminar/:id', verificarAutenticacion, eliminarReserva)

export default router