const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    edad: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {                          // ← NUEVO
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
});

module.exports = mongoose.model("User", userSchema);