
module.exports.login = async (req, res) => {
  const { password, email } = req.body;
  let sql = "SELECT id,email,password,hashedPassord FROM users where email=(?)"
  let query = db.query(sql, [email], (error, results, fields));

  query.on("error", function (err) {
    logger.serverLogger.log('error', err)
    return res.status(500).send("An error occurred");
  });
  query.on("result", function (result) {
      if (result.length === 0) {
        return res.status(500).send("user email is incorrect");
      }
      const isPasswordValid = await bcrypt.compare(password, result[0].password)
      if (!isPasswordValid){
        return res.status(500).send("Password is incorrect");
      }

    token = jwt.sign({ user: result[0] }, process.env.TOKEN_KEY);
    return res.json({ token });
      
  });
}

