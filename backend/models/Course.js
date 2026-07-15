const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title:       { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        default: '', 
        trim: true 
    },
    image:       { 
        type: String, 
        default: null
    },
    category:    { 
        type: String, 
        default: '' 
    },
    esInterno:   { 
        type: Boolean, 
        default: false 
    } // ← NUEVO
});

module.exports = mongoose.model('Course', courseSchema);