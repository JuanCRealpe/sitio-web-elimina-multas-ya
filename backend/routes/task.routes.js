const { Router } = require("express");

const {
    crearTask,
    obtenerTasks,
    actualizarTask,
    eliminarTask
} = require("../controllers/task.controllers");

const router = Router();

router.post("/crearTask", crearTask);

router.get("/obtenerTasks", obtenerTasks);

router.put("/actualizarTask/:id", actualizarTask);

router.delete("/eliminarTask/:id", eliminarTask);

module.exports = router;