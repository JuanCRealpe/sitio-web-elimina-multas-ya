const User = require("../models/User");
const crypto = require("crypto");

const generarIntegridad = (referencia, monto, moneda, secreto) => {
    const cadena = `${referencia}${monto}${moneda}${secreto}`;
    return crypto.createHash("sha256").update(cadena).digest("hex");
};

const crearPago = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        const referencia = `sub_${user._id}_${Date.now()}`;
        const monto = 1990000; // 19900 en centavos
        const moneda = "COP";

        const firma = generarIntegridad(
            referencia,
            monto,
            moneda,
            process.env.WOMPI_INTEGRITY_SECRET
        );

        return res.status(200).json({
            publicKey:  process.env.WOMPI_PUBLIC_KEY,
            referencia,
            monto,
            moneda,
            firma,
            email: user.email,
            nombre: user.nombre
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const webhookWompi = async (req, res) => {
    try {
        const { event, data } = req.body;

        if (event === "transaction.updated") {
            const transaccion = data.transaction;

            if (transaccion.status === "APPROVED") {
                const referencia = transaccion.reference;
                const userId = referencia.split("_")[1];

                const expira = new Date();
                expira.setMonth(expira.getMonth() + 3);

                await User.findByIdAndUpdate(userId, {
                    suscripcionActiva:  true,
                    suscripcionExpira:  expira
                });
            }
        }

        return res.status(200).json({ msg: "Webhook recibido" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verificarSuscripcion = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const ahora = new Date();

        if (user.suscripcionExpira && ahora > user.suscripcionExpira) {
            await User.findByIdAndUpdate(req.user.id, {
                suscripcionActiva: false
            });
            return res.status(200).json({ activa: false });
        }

        return res.status(200).json({
            activa:  user.suscripcionActiva,
            expira:  user.suscripcionExpira
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearPago, webhookWompi, verificarSuscripcion };