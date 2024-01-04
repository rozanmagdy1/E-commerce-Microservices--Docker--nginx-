const jwt = require("jsonwebtoken");
const extractInfoFromToken = async(token)=> {
    let decoded = jwt.verify(token, 'logintokenxxxxqqqoo');
    return [decoded.username, decoded.id, decoded.isAdmin];
}
module.exports = {
    extractInfoFromToken
}