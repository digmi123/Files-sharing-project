const {serverLogger} = require ('../logger');


module.exports.getProjectsList = (req, res, next) => {
    sql = "SELECT * FROM access JOIN projects on (access.project_id = projects.id) WHERE user_id = (?)"
    db.query(sql, [req.user.id], async (error, results) => {
        if(error){
            serverLogger.error(error)
            return res.status(500).send("An error occurred");
        }
        res.status(200).json(results)
    })
}

module.exports.insertProjectIntoDB = (req, res, next) => {
    const {name} = req.body;
    sql = "INSERT INTO projects (name, folder_id) VALUES (?,?)"
    db.query(sql, [name, req.foldersID], async (error, results) => {
        if(error){
            serverLogger.error(error)
            return res.status(500).send("An error occurred");
        }
        req.body.projectID = results.insertId;
        req.body.userID = req.user.id;
        req.body.roll = "Admin";
        next()
    })
}

module.exports.giveAccess = (req, res, next) => {
    const {userID,projectID,roll} = req.body;
    sql = "INSERT INTO access (user_id, project_id, roll) VALUES (?,?,?)";
    db.query(sql, [userID,projectID,roll], async (error, results) => {
        if(error){
            serverLogger.error(error)
            return res.status(500).send("An error occurred");
        }
        next()
    })
}

module.exports.createProject = (req, res) => {
    res.status(200).send("Project created successfuly");
}