const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Crea las carpetas si no existen, para que funcione en cualquier despliegue nuevo
["uploads/imagenes", "uploads/videos", "uploads/documentos"].forEach(dir => {
    const fullPath = path.join(__dirname, "..", dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dest = "uploads/imagenes"; // default para imágenes

        if (file.mimetype.startsWith("video/")) {
            dest = "uploads/videos";
        } else if (
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
            file.mimetype === "application/msword" || // .doc
            file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
            file.mimetype === "application/vnd.ms-excel" // .xls
        ) {
            dest = "uploads/documentos";
        }

        cb(null, dest);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImage = ["image/jpeg", "image/png", "image/webp"];
    const allowedVideo = ["video/mp4", "video/webm", "video/quicktime"];
    const allowedDoc = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel"
    ];

    const allowed = [...allowedImage, ...allowedVideo, ...allowedDoc];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Tipo de archivo no permitido"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 500 * 1024 * 1024 } // 500MB — para videos de hasta ~20 minutos
});

module.exports = upload;