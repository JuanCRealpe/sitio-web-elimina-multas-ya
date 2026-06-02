const express = require("express");
const router = express.Router();
const { registrar, login } = require("../controllers/auth.controllers");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const validador = require("../middlewares/validate.middleware")

router.post("/registrar", registerValidator, validador,  registrar);
router.post('/login', loginValidator, validador, login);

module.exports = router;