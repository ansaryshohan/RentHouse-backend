const express = require("express");
const verifyToken = require("../../middlewares/verifyToken")
const verifyAdmin = require("../../middlewares/verifyAdmin")
const router = express.Router();
const {
  addAgreementController
} = require("./agreements.controller");

// admin only route

// users route
router.post("/add-agreement",verifyToken,addAgreementController)




module.exports = router;