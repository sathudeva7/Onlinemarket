import express from "express";
import Admin from "../models/adminModel.js";
import { takeToken } from "../util.js";
const adminroute = express.Router();

adminroute.post("/signinadmin", async (req, res) => {
  const signinAdmin = await Admin.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinAdmin) {
    res.send({
      _id: signinAdmin.id,
      name: signinAdmin.name,
      email: signinAdmin.email,
      isAdmin: signinAdmin.isAdmin,
      token: takeToken(signinAdmin),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email and Password" });
  }
});

adminroute.post("/register", async (req, res) => {
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newAdmin = await admin.save();
  if (newAdmin) {
    res.send({
      _id: newAdmin.id,
      name: newAdmin.name,
      email: newAdmin.email,
      isAdmin: newAdmin.isAdmin,
      token: takeToken(newAdmin),
    });
  } else {
    res.status(401).send({ msg: "Invalid Admin Data" });
  }
});

export default adminroute;
