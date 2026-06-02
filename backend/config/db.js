const mongoose = require("mongoose");

const connectDB = async () => {
    try { 
        await mongoose.connect(process.env.MONGO_URI)
        console.log("te conectaste a mongo");
    } catch(error) {
        console.error(`Error en mongodb Error: ${ error.message }`)
    }
};

module.exports = connectDB;