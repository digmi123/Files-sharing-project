const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")

const {getProjectsList, insertProjectIntoDB,giveAccess,createProject} = require("../controllers/projects");
const {insertRootFolderIntoDB} = require("../controllers/folders");

const test = (req, res, next) =>{
    console.log(req.body);
    return res.status(200).send("Test");
}

router.use(verifyToken)
router.get("/getProjects", getProjectsList);
router.post("/createProject",insertRootFolderIntoDB ,insertProjectIntoDB, giveAccess, createProject);

module.exports = router;