const express = require("express");
const verifyToken = require("../../middlewares/verifyToken")
const router = express.Router();
const {
  createUserController
} = require("./user.controller");

router.post("/create-user",createUserController)
// public routes

module.exports = router;