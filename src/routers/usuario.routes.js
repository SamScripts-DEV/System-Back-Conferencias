import {Router} from 'express'
import { detalleUsuarios, login, perfil, registro } from '../controllers/usuario_controller.js'
import { validacionUsuario } from '../middlewares/usuario_validaciones.js'
import verificarAutenticacion from '../middlewares/Auth.js'
const router = Router()

router.post('/login', login)

router.post('/registro', validacionUsuario, registro)





router.get('/perfil',verificarAutenticacion,perfil)



router.get('/usuario/:id',verificarAutenticacion,detalleUsuarios)




export default router