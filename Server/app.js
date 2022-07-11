var mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");
const {serverLogger} = require ('./logger')
const app = express();
const cors = require("cors");
const upload = require('./controllers/processFile');
const filesController = require("./controllers/files");
const foldersController = require('./routes/folders');
const passwordRequirements = require("./routes/passwordRequirements");


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
app.use("/passwordRequirements", passwordRequirements);

app.use("/files", filesController);
app.use("/folders", foldersController);

app.listen(config.PORT, () => {
  serverLogger.debug(`Server listening on port ${config.PORT}`)
});