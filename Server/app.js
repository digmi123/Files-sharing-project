var mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");
const {serverLogger} = require ('./logger')
const app = express();
const cors = require("cors");
const upload = require('./controllers/processFile');
const filesRoutes = require("./routes/files");
const foldersRoutes = require('./routes/folders');
const usersRoutes = require('./routes/users');
const passwordRequirements = require("./routes/passwordRequirements");
const cookies = require('cookie-parser')

dotenv.config()
config = process.env;

db = mysql.createConnection({
  user: config.DB_USER,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});
app.use(cors());
app.use(cookies());
app.use(upload.array('files'));
app.get("/",(req, res)=>{res.send("server is up and running")})
app.use("/passwordRequirements", passwordRequirements);

app.use("/files", filesRoutes);
app.use("/folders", foldersRoutes);
app.use("/users", usersRoutes);

app.listen(config.PORT, () => {
  serverLogger.debug(`Server listening on port ${config.PORT}`)
});