const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")

const { getProjectsList,
    insertProjectIntoDB,
    giveAccess, createProject,
    rename } = require("../controllers/projects");
const { insertRootFolderIntoDB } = require("../controllers/folders");
const { updateAccess, createAccess, removeAccess } = require("../controllers/permissions");

const test = (req, res) => {
    // const {projectInfo} = req.body
    console.log(req.body);
    return res.status(200).send("Test");
}

router.use(verifyToken)
router.get("/getProjects", getProjectsList);
router.get("/createProject", insertRootFolderIntoDB, insertProjectIntoDB, giveAccess, createProject);
router.post("/editProject", rename, updateAccess, createAccess, removeAccess, test);

module.exports = router;