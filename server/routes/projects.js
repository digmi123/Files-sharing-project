const express = require("express");
const router = express.Router();
const verifyToken = require("../auth")

const {getProjectsList, insertProjectIntoDB, giveAccess, rename} = require("../controllers/projects");
const {insertRootFolderIntoDB} = require("../controllers/folders");
const {createAndUpdateAccess, removeAccess} = require("../controllers/permissions");


router.use(verifyToken)
router.get("/getProjects", getProjectsList);
router.get("/createProject", insertRootFolderIntoDB, insertProjectIntoDB, giveAccess, (req, res) => res.status(200).send("Project created successfuly"));
router.post("/editProject", rename, createAndUpdateAccess, removeAccess, (req, res) => res.status(200).send("Project Update successfuly"));

module.exports = router;