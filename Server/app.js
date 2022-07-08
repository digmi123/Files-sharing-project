var mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");
const {serverLogger} = require ('./logger')
const app = express();
const cors = require("cors");
const filesController = require("./controllers/files");
const passwordRequirements = require("./routes/passwordRequirements");
const upload = require('./controllers/processFile');


dotenv.config()
config = process.env;

db = mysql.createConnection({
  user: config.DB_USER,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});
app.use(cors());
app.use(upload.array('files'));
app.get("/",(req, res)=>{res.send("server is up and running")})
app.use("/files", filesController);
app.use("/passwordRequirements", passwordRequirements);

app.listen(config.PORT, () => {
  serverLogger.debug(`Server listening on port ${config.PORT}`)
});