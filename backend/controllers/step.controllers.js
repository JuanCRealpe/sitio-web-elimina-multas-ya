const Step = require("../models/step");

const crearStep = async (req, res) => {
    try {
        const { courseId, titulo, orden } = req.body;

        const step = new Step({
            courseId,
            titulo,
            orden,
            bloques: []
        });

        await step.save();

        return res.status(201).json({
            msg: "Paso creado correctamente",
            step
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerStepsPorCurso = async (req, res) => {
    try {
        const { courseId } = req.params;

        const steps = await Step.find({ courseId }).sort({ orden: 1 });

        return res.status(200).json({
            msg: "Pasos obtenidos correctamente",
            steps
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const agregarBloque = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, nombre, url, redirige } = req.body;

        const bloque = {
            tipo,
            nombre:    nombre    || null,
            url:       url       || null,
            redirige:  redirige  || null,
            contenido: req.file ? req.file.path : req.body.contenido || null
        };

        const step = await Step.findByIdAndUpdate(
            id,
            { $push: { bloques: bloque } },
            { new: true }
        );

        return res.status(200).json({
            msg: "Bloque agregado correctamente",
            step
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarBloque = async (req, res) => {
    try {
        const { id, bloqueId } = req.params;
        const { tipo, contenido, nombre, url, redirige } = req.body;

        const datos = {
            "bloques.$.tipo":      tipo,
            "bloques.$.nombre":    nombre    || null,
            "bloques.$.url":       url       || null,
            "bloques.$.redirige":  redirige  || null, // ← CAMBIADO
            "bloques.$.contenido": contenido || null
        };

        if (req.file) {
            datos["bloques.$.contenido"] = req.file.path;
        }

        const step = await Step.findOneAndUpdate(
            { _id: id, "bloques._id": bloqueId },
            { $set: datos },
            { new: true }
        );

        return res.status(200).json({
            msg: "Bloque actualizado correctamente",
            step
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarStep = async (req, res) => { // ← NUEVO
    try {
        const { id } = req.params;
        const { titulo, orden } = req.body;

        const step = await Step.findByIdAndUpdate(
            id,
            { titulo, orden },
            { new: true }
        );

        return res.status(200).json({
            msg: 'Paso actualizado correctamente',
            step
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarBloque = async (req, res) => {
    try {
        const { id, bloqueId } = req.params;

        const step = await Step.findByIdAndUpdate(
            id,
            { $pull: { bloques: { _id: bloqueId } } },
            { new: true }
        );

        return res.status(200).json({
            msg: "Bloque eliminado correctamente",
            step
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarStep = async (req, res) => {
    try {
        const { id } = req.params;

        const step = await Step.findByIdAndDelete(id);

        return res.status(200).json({
            msg: `El paso ${step.titulo} fue eliminado correctamente`
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearStep,
    obtenerStepsPorCurso,
    agregarBloque,
    actualizarBloque,
    actualizarStep, // ← NUEVO
    eliminarBloque,
    eliminarStep
};