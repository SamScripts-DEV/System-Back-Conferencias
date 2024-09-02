// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerUsuario from './routers/usuario.routes.js'
import routerConferencista from './routers/conferencista.routes.js'
import routerAuditorio from './routers/auditorio.routes.js'
import routerReserva from './routers/reserva.routes.js'



// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales



app.use('/api', routerUsuario)
app.use('/api', routerConferencista)
app.use('/api', routerAuditorio)
app.use('/api', routerReserva)
// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

// Exportar la instancia de express por medio de app
export default  app