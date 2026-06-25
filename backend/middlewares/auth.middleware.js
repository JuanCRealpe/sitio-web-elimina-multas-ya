const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const headerAuthorization = req.header("Authorization");
    const token = headerAuthorization.split(" ")[1]

    if(!token) {
        return res.status(401).json({
            msg: "No hay token"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch(error) {
        return res.status(401).json({
            msg: "Token invalido"
        })
    }
};