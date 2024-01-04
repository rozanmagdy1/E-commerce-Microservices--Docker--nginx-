const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const morgan = require('morgan');
const fs = require('fs');

const { adminMiddleware  } = require("./Middlewares/adminMiddleware");
const { shoppingRoutesIndex } = require("./Routes/shoppingRoutesIndex");

const { connectDB } = require('./Config/db');
connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminMiddleware);
shoppingRoutesIndex(app);

const accessLogStream = fs.createWriteStream('./shooping_server_access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

const accessIpStream = fs.createWriteStream("./shooping_server_ip.log", { flags: "a" });
morgan.token('client-ip', (req) => { return req.ip; });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :client-ip', { stream: accessIpStream }));

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
    console.log(`shooping app listen on port: ${PORT}`);
});