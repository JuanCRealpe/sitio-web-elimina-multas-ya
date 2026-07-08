const Course = require('../models/course');
const fs = require("fs"); // ← NUEVO

const crearCourse = async (req, res) => {
    try {
        const { title, description, category } = req.body; // ← CAMBIADO

        let course = await Course.findOne({ title });

        if (course) {
            return res.status(400).json({
                msg: `El curso ${title} ya existe`
            });
        }

        course = new Course({
            title,
            description,          // ← CAMBIADO
            image: req.file.path, // ← CAMBIADO (antes era req.body.image)
            category              // ← CAMBIADO
        });

        await course.save();

        return res.status(201).json({
            msg: 'El curso se creó correctamente',
            course
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const obtenerCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        return res.status(200).json({
            msg: 'Los cursos se obtuvieron correctamente',
            courses
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const actualizarCourse = async (req, res) => {
    try {
        const id = req.params.id;

        const course = await Course.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            msg: 'Curso actualizado correctamente',
            course
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const eliminarCourse = async (req, res) => {
    try {
        const id = req.params.id;

        const course = await Course.findById(id); // ← CAMBIADO (antes era findByIdAndDelete)

        if (!course) { // ← NUEVO
            return res.status(404).json({
                msg: "Curso no encontrado"
            });
        }

        fs.unlink(course.image, (err) => { // ← NUEVO
            if (err) console.log("Error al eliminar imagen:", err);
        });

        await Course.findByIdAndDelete(id); // ← NUEVO

        return res.status(200).json({
            msg: `El curso ${course.title} fue eliminado correctamente`
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    crearCourse,
    obtenerCourses,
    actualizarCourse,
    eliminarCourse
};