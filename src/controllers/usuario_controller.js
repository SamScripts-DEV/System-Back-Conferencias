import Usuario from "../models/Usuario.js"
import generarToken from "../helpers/crearJWT.js"
import mongoose from "mongoose"


const login = async (req, res) => {
    const { email, password } = req.body
    if (Object.values(req.body).includes('')) return res.status(404).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })
    
    const usuarioBdd = await Usuario.findOne({ email }).select('-status -__v -createdAt -updatedAt -token')

    if (!usuarioBdd) return res.status(404).json({ res: 'El email no se encuentra registrado' })

    

    const verificarPassword = await usuarioBdd.matchPassword(password)

    if (!verificarPassword) return res.status(401).json({ res: 'Contraseña incorrecta' })

    const token = generarToken(usuarioBdd._id, 'usuario')
    const { nombre, apellido, direccion, telefono, _id } = usuarioBdd

    res.status(200).json({ res: 'Login exitoso', token, nombre, apellido, direccion, telefono, _id, email, rol: 'usuario' })
}


const perfil = (req, res) => {
    if (!req.usuarioBdd) return res.status(404).json({ res: 'No se encuentra el usuario, inicie sesión nuevamente' })
    
    delete req.usuarioBdd.token
    

    req.usuarioBdd.rol = 'usuario'

    res.status(200).json(req.usuarioBdd)
}


const registro = async (req, res) => {
    const { email, password } = req.body

    if (Object.values(req.body).includes('')) return res.status(400).json({ res: 'Rellene todos los campos antes de enviar la solicitud' })

    if (await Usuario.findOne({ email })) return res.status(400).json({ res: 'El email ya se encuentra registrado' })
    
    const nuevoUsuario = new Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
    await nuevoUsuario.crearToken()
    
    await nuevoUsuario.save()

    res.status(201).json({ res: 'Registro exitoso, Incie sesión' })
}


const confirmEmail = (req,res)=>{
    res.status(200).json({res:'confirmar email de registro de veterinario'})
}
const listarUsuarios = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}
const detalleUsuarios = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ res: `ID ${id} no válido` })

    const usuarioBdd = await Usuario.findById(id).select('-password')

    res.status(200).json(usuarioBdd)
}
const actualizarPerfil = (req,res)=>{
    res.status(200).json({res:'actualizar perfil de un veterinario registrado'})
}





export {
    login,
    perfil,
    registro,
    confirmEmail,
    listarUsuarios,
    detalleUsuarios,
    actualizarPerfil,
    
}