var mysql = require("mysql2");
const dotenv = require("dotenv");
const express = require("express");

const app = express();
const cors = require("cors");
const filesController = require("./controllers/files");
const passwordRequirements = require("./routes/passwordRequirements");

dotenv.config()
const config = process.env;

db = mysql.createConnection({
  user: config.DB_USER,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

app.use(cors());
app.use("/files", filesController);
app.use("/passwordRequirements", passwordRequirements);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
