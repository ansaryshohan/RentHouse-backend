const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const router = express.Router();
const {
  createUserController,
  getUserRoleController,
  getAllUsersController,
  updateUserRoleController,
  deleteUserController,
} = require("./user.controller");

router.post("/create-user", createUserController);
router.get("/all-users", verifyToken, verifyAdmin, getAllUsersController);
router.patch(
  "/update-user/:userId",
  verifyToken,
  verifyAdmin,
  updateUserRoleController
);
router.delete(
  "/delete-user/:userId",
  verifyToken,
  verifyAdmin,
  deleteUserController
);
router.get(
  "/user-role/:userEmail",
  verifyToken,
  verifyAdmin,
  getUserRoleController
);
// public routes

module.exports = router;
