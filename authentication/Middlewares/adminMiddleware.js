const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

async function adminMiddleware(req, res, next) {
    if (req.path == '/login' || req.path == '/adduser' || req.path == '/forgotpassword' || req.path == '/resetpassword') {
        next();
    } else {
        try {
            const token = req.headers["authorization"];
            if (!token) {
                return res.status(401).json({ message: "unauthorized" });
            } else {
                const decoded = jwt.verify(token, 'logintokenxxxxqqqoo');
                const user = await User.findById(decoded.id);
                if (!user || decoded.isAdmin === false) {
                    return res.status(401).json({ message: "unauthorized" })
                } else {
                    req.user = user;
                    next();
                }
            }
        } catch (e) {
            console.log(e);
            res.json({
                message: "invalid token"
            })
        }
    }
}

module.exports = {
    adminMiddleware
}