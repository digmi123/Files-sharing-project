const express = require("express");
const router = express.Router();

const passReq = require("../config.json");


module.exports.getPassRequirements = async (req, res) => {
  try {
      res.json(passReq["password requirements"]);
  } catch (err) {
    res.json({ message: err });
  }
};