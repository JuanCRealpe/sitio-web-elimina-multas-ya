const { Router } = require("express");
const validarToken = require("../middlewares/auth.middleware");
const { crearPago, webhookWompi, verificarSuscripcion } = require("../controllers/payment.controllers");

const router = Router();

router.get("/crearPago", validarToken, crearPago);
router.post("/webhook", webhookWompi);
router.get("/verificarSuscripcion", validarToken, verificarSuscripcion);

module.exports = router;