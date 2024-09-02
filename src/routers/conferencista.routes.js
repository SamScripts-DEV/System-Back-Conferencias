import {Router} from 'express'
import {registrarConferencista, getAllConferencistas, getConferencistaById, actualizarConferencista, eliminarConferencista} from '../controllers/conferencista_controller.js'
import {validacionConferencista} from '../middlewares/conferencista_validaciones.js'
import verificarAutenticacion from '../middlewares/Auth.js'
const router = Router()


router.get('/conferencistas', verificarAutenticacion,getAllConferencistas)
router.get('/conferencista/:id', verificarAutenticacion,getConferencistaById)
router.post('/conferencista/registro', verificarAutenticacion,validacionConferencista, registrarConferencista)
router.put('/conferencista/actualizar/:id', verificarAutenticacion,validacionConferencista,actualizarConferencista)
router.delete('/conferencista/eliminar/:id', verificarAutenticacion,eliminarConferencista)






export default router