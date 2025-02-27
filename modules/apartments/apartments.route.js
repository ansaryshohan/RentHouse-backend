const express = require("express");
const verifyToken = require("../../middlewares/verifyToken")
const verifyAdmin = require("../../middlewares/verifyAdmin")
const router = express.Router();
const {
  getTopApartmentController,
  getAllApartmentController,
  getAllApprovedApartmentController,
  getAllApartmentAccordingSearchController,
  addApartmentController
} = require("./apartment.controller");

// admin only route
router.get("/all-apartments",verifyToken,verifyAdmin, getAllApartmentController);
// users route
router.post("/add-apartment",verifyToken,addApartmentController)
// public routes
router.get("/top-apartments", getTopApartmentController);
router.get("/approved-apartments", getAllApprovedApartmentController);
router.get("/search-apartments", getAllApartmentAccordingSearchController);


module.exports = router;