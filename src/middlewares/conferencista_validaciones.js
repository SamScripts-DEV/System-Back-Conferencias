import { check, validationResult } from "express-validator"; 

export const validacionConferencista = [
    check(["nombre", "apellido", "cedula", "genero", "ciudad", "direccion", "fecha_nacimiento", "telefono", "email", "empresa"])
        .exists()
        .withMessage('Los campos "nombre" "apellido" "cedula" "genero" "ciudad" "direccion" "fecha_nacimiento" "telefono" "email" y/o "empresa" son obligatorios')
        .notEmpty()
        .withMessage('Los campos "nombre" "apellido" "cedula" "genero" "ciudad" "direccion" "fecha_nacimiento" "telefono" "email" y/o "empresa" no pueden estar vacíos')
        .customSanitizer(value => value?.trim()),

    check(["nombre", "apellido", "ciudad", "direccion", "empresa"])
        .isLength({ min: 3, max: 12 })
        .withMessage('El campo "nombre" "apellido" "ciudad" "direccion" y/o "empresa" debe(n) tener entre 3 y 12 caracteres')
        .isAlpha("es-ES", { ignore: "áéíóúÁÉÍÓÚñÑ" })
        .withMessage('El campo "nombre" "apellido" "ciudad" "direccion" y/o "empresa" debe(n) contener solo letras')
        .customSanitizer(value => value?.trim()),

    check("cedula")
        .isLength({ min: 10, max: 10 })
        .withMessage('El campo "cedula" debe tener 10 caracteres')
        .isNumeric()
        .withMessage('El campo "cedula" debe ser numérico')
        .customSanitizer(value => value?.trim()),

    check("genero")
        .isIn(['Masculino', 'Femenino', 'Otro'])
        .withMessage('El campo "genero" debe ser Masculino, Femenino u Otro')
        .customSanitizer(value => value?.trim()),

    check("fecha_nacimiento")
        .isISO8601()
        .withMessage('El campo "fecha_nacimiento" debe tener el formato de fecha ISO8601')
        .customSanitizer(value => value?.trim()),

    check("telefono")
        .isLength({ min: 10, max: 10 })
        .withMessage('El campo "telefono" debe tener 10 caracteres')
        .isNumeric()
        .withMessage('El campo "telefono" debe ser numérico')
        .customSanitizer(value => value?.trim()),

    check("email")
        .isEmail()
        .withMessage('El campo "email" no es correcto')
        .customSanitizer(value => value?.trim()),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        return next()
    }
];