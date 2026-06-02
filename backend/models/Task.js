const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Task", taskSchema);