const { Router } = require("express");
const validarToken = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    crearCourse,
    obtenerCourses,
    actualizarCourse,
    eliminarCourse
} = require("../controllers/course.controllers");

const router = Router();

router.post("/crearCourse", validarToken, upload.single("image"), crearCourse);

router.get("/obtenerCourses", validarToken, obtenerCourses);

router.put("/actualizarCourse/:id", validarToken, upload.single("image"), actualizarCourse);

router.delete("/eliminarCourse/:id", validarToken, eliminarCourse);

module.exports = router;