const express = require("express");
const verifyToken = require("../../middlewares/verifyToken")
const router = express.Router();
const {
  getTopApartmentController,
  getAllApartmentController,
  getAllApprovedApartmentController,
  getAllApartmentAccordingSearchController,
} = require("./apartment.controller");


router.get("/top-apartments", getTopApartmentController);
router.get("/all-apartments", getAllApartmentController);
router.get("/approved-apartments", getAllApprovedApartmentController);
router.get("/search-apartments", getAllApartmentAccordingSearchController);
// public routes

module.exports = router;