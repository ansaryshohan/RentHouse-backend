const express = require("express");
const verifyToken = require("../../middlewares/verifyToken")
const verifyAdmin = require("../../middlewares/verifyAdmin")
const router = express.Router();
const {
  addAgreementController,
  getSingleUnpaidAgreementController,
  deleteAnUnpaidAgreementController,
} = require("./agreements.controller");

// admin only route

// users route
router.get("/:userEmail",verifyToken,getSingleUnpaidAgreementController)
router.post("/add-agreement",verifyToken,addAgreementController)
router.delete("/user-agreement-delete/:agreementId",verifyToken,deleteAnUnpaidAgreementController)




module.exports = router;