const {serverLogger} = require ('../logger');


module.exports.getPermissionsList = (req, res, next) => {
    sql = "SELECT name FROM permissions"
    db.query(sql, async (error, results) => {
        if(error){
            serverLogger.error(error)
            return res.status(500).send("An error occurred");
        }
        return res.status(200).json(results)
    })
}