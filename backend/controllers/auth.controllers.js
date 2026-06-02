const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrar = async(req, res) => {
    try {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const edad = req.body.edad;
        const password = req.body.password;

        let user = await User.findOne({ email: email});
        if(user) return res.status(400).json({ 
            msg: `el usuario ${ email } ya existe en la base de datos`
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            nombre: nombre,
            email: email,
            edad: edad,
            password: hashedPassword
        });

        await user.save();

        return res.status(201).json({ 
            msg: "el usuario se ha registrado correctamente"
        });
    } catch (error) {

        return res.status(500).json({ 
            error: error.message 
        });
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne ({ email });
        if(!user) return res.status(400).json({
            msg: "El usuario no existe"
        })

        const passwordsCoinciden = await bcrypt.compare(password, user.password);
        if(!passwordsCoinciden) return res.status(400).json({
            msg: "Contraseña incorrecta"
        })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.json({
            token
        })
    } catch (error) {

        return res.status(500).json({ 
            error: error.message 
        });
    }
};

module.exports = {
    registrar, 
    login
};
