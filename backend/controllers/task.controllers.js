const Task = require("../models/Task")

const crearTask = async (req, res) => {

    try {

        const titulo = req.body.titulo;
        const user = req.body.user;

        let task = await Task.findOne({ titulo: titulo });

        if(task) {
            return res.status(400).json({
                msg: `La tarea ${titulo} ya existe`
            });
        }

        task = new Task({
            titulo,
            user
        });

        await task.save();

        return res.status(201).json({
            msg: "la tarea se creo correctamente",
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

        const tasks = await Task.find();

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

        let task = await Task.findById(id);

        if(!task) {
            return res.status(404).json({
                msg: "La tarea no existe"
            });
        }

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

        let task = await Task.findById(id);

        if(!task) {
            return res.status(404).json({
                msg: "La tarea no existe"
            });
        }

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