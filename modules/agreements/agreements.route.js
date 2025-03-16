const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken")
const verifyAdmin = require("../../middlewares/verifyAdmin")
const {
  addAgreementController,
  getSingleUnpaidAgreementController,
  deleteAnUnpaidAgreementController,
  getAllAgreementsController,
} = require("./agreements.controller");

// admin only route
router.get("/all-agreements",verifyToken,verifyAdmin,getAllAgreementsController)

// users route
router.get("/:userEmail",verifyToken,getSingleUnpaidAgreementController)
router.post("/add-agreement",verifyToken,addAgreementController)
router.delete("/user-agreement-delete/:agreementId",verifyToken,deleteAnUnpaidAgreementController)


module.exports = router;