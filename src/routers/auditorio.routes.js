import {Router} from 'express'
import {
    getAllAuditorios,
    getAuditorioById,
    registrarAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
}from '../controllers/auditorio_controller.js'

import verificarAutenticacion from '../middlewares/Auth.js'
const router = Router()

router.get('/auditorio', verificarAutenticacion, getAllAuditorios)
router.get('/auditorio/:id', verificarAutenticacion, getAuditorioById)
router.post('/auditorio/registro', verificarAutenticacion, registrarAuditorio)
router.put('/auditorio/actualizacion/:id', verificarAutenticacion, actualizarAuditorio)
router.delete('/auditorio/eliminar/:id', verificarAutenticacion, eliminarAuditorio)






export default router