const express = require("express");
const verifyToken = require("../../middlewares/verifyToken")
const verifyAdmin = require("../../middlewares/verifyAdmin")
const router = express.Router();
const {
  createUserController,
  getUserRoleController,
  getAllUsersController
} = require("./user.controller");

router.post("/create-user",createUserController)
router.get("/all-users",verifyToken,getAllUsersController)
router.get("/user-role/:userEmail",verifyToken,getUserRoleController)
// public routes

module.exports = router;