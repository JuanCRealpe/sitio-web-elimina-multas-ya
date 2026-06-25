const Task = require("../models/Task")

const crearTask = async (req, res) => {
    try {
        const { titulo } = req.body;

        let task = await Task.findOne({ titulo });

        if (task) {
            return res.status(400).json({
                msg: `La tarea ${titulo} ya existe`
            });
        }

        task = new Task({
            titulo,
            user: req.user.id
        });

        await task.save();

        return res.status(201).json({
            msg: "La tarea se creó correctamente",
            task
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const obtenerTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user.id
        });

        return res.status(200).json({
            msg: "Las tareas se obtuvieron correctamente",
            tasks
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

const actualizarTask = async (req, res) => {

    try {

        const id = req.params.id;

        task = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            msg: "Tarea actualizada correctamente",
            task
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

const eliminarTask = async (req, res) => {

    try {

        const id = req.params.id;

        await Task.findByIdAndDelete(id);

        return res.status(200).json({
            msg:`La tarea ${task.titulo} fue eliminada correctamente`
            
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {
    crearTask,
    obtenerTasks,
    actualizarTask,
    eliminarTask
};