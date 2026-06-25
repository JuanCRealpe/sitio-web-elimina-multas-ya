const { Router } = require("express");
const validarToken = require("../middlewares/auth.middleware")

const {
    crearTask,
    obtenerTasks,
    actualizarTask,
    eliminarTask
} = require("../controllers/task.controllers");

const router = Router();

router.post("/crearTask",validarToken, crearTask);

router.get("/obtenerTasks",validarToken, obtenerTasks);

router.put("/actualizarTask/:id",validarToken, actualizarTask);

router.delete("/eliminarTask/:id",validarToken, eliminarTask);

module.exports = router;