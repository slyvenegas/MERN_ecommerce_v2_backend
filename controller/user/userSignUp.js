const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Verificar si ya existe un usuario con el mismo email
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            });
        }

        // Validar que se proporcionen todos los datos necesarios
        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Please provide email, password, and name.",
                error: true,
                success: false
            });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Crear un nuevo usuario con los datos proporcionados
        const newUser = new userModel({
            email,
            password: hashPassword,
            name,
            role: "GENERAL"
        });

        // Guardar el usuario en la base de datos
        const savedUser = await newUser.save();

        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message:  "User created successfully."
        });

    } catch (err) {
        // Capturar cualquier error y devolver una respuesta adecuada
        res.status(500).json({
            message: err.message || "An error occurred while creating the user.",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
