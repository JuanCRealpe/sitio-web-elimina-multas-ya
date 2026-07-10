const mongoose = require("mongoose");

const bloqueSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ["titulo", "subtitulo", "texto", "imagen", "archivo", "boton-externo", "boton-interno"],
        required: true
    },
    contenido: { type: String, default: null }, // texto, ruta imagen o archivo
    nombre:    { type: String, default: null }, // nombre visible del botón o archivo
    url:       { type: String, default: null }, // para boton-externo
    redirige:  { type: mongoose.Schema.Types.ObjectId, ref: "Step", default: null } // para boton-interno
});

const stepSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    orden: {
        type: Number,
        required: true
    },
    bloques: [bloqueSchema]
});

module.exports = mongoose.model("Step", stepSchema);