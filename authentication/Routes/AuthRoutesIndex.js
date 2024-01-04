const {userRoute} = require("./userRoutes");
const {authRoute} = require("./authRoutes");

function AuthRoutesIndex(app) {
    userRoute(app);
    authRoute(app);
}

module.exports = {
    AuthRoutesIndex
}