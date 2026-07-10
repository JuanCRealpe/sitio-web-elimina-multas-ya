const { Router } = require("express");
const validarToken = require("../middlewares/auth.middleware");
const validarAdmin = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    crearStep,
    obtenerStepsPorCurso,
    agregarBloque,
    actualizarBloque,
    actualizarStep,   // ← NUEVO
    eliminarBloque,
    eliminarStep
} = require("../controllers/step.controllers");

const router = Router();

router.post("/crearStep", validarToken, validarAdmin, upload.single("contenido"), crearStep);
router.get("/obtenerSteps/:courseId", validarToken, obtenerStepsPorCurso);
router.put("/agregarBloque/:id", validarToken, validarAdmin, upload.single("contenido"), agregarBloque);
router.put("/actualizarBloque/:id/:bloqueId", validarToken, validarAdmin, upload.single("contenido"), actualizarBloque);
router.put("/actualizarStep/:id", validarToken, validarAdmin, upload.single("contenido"), actualizarStep); // ← NUEVO
router.delete("/eliminarBloque/:id/:bloqueId", validarToken, validarAdmin, eliminarBloque);
router.delete("/eliminarStep/:id", validarToken, validarAdmin, eliminarStep);

module.exports = router;