const {serverLogger} = require ('../logger');


module.exports.getProjectsList = (req, res, next) => {
    sql = 'select id,name,project_id ,json_arrayagg(info) as accessinfo from projects join (select  project_id,json_object("user_id",user_id,"roll", roll,"email",email) as info from access join users on (user_id=id) where project_id in (select project_id from access where user_id = ?) group by user_id, project_id) as t1 on (id=project_id) group by project_id;'
    db.query(sql, [req.user.id], async (error, results) => {
        if(error){
            serverLogger.error(error)
            return res.status(500).send("An error occurred");
        }
        res.status(200).json(results)
    })
}

module.exports.insertProjectIntoDB = (req, res, next) => {
    sql = "INSERT INTO projects (name, folder_id) VALUES (?,?)"
    db.query(sql, ["New Project", req.foldersID], async (error, results) => {
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

module.exports.rename = (req, res, next) => {
    const {name , projectID} = req.body;
    const sql = "UPDATE projects SET name = (?) WHERE id = (?);"
    db.query(sql, [name , projectID], async (error, results) => {
        if(error){
            serverLogger.error(error)
            return res.status(500).send("An error occurred");
        }
        next()
    })
}