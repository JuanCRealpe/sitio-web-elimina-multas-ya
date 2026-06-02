const { body } = require("express-validator");

const registerValidator = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 3 }).withMessage("Minimo 3 caracteres"),
    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debes enviar un email valido"),
    body("edad")
        .notEmpty().withMessage("La edad es obligatoria")
        .isInt({ min:16 }).withMessage("La edad minima es 16 años"),
    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isStrongPassword().withMessage("La contraseña debe tener min 8 caracteres, mayusculas, minusculas, numeros y caracter especial"),
]; 

const loginValidator = [
    body('email')
        .notEmpty().withMessage('El Email es obligatorio')
        .isEmail().withMessage('Debes ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
    registerValidator, loginValidator
}