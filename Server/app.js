const express = require("express")
const app = express()
const cors = require('cors')
const filesController = require('./controllers/files');
const passwordRequirements = require("./routes/passwordRequirements");

app.use(cors())
app.use('/files', filesController);
app.use('/passwordRequirements', passwordRequirements);



app.listen(5000, ()=>{
    console.log("listening on port 5000")
})
