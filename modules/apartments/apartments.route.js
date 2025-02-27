const express = require("express");
const verifyToken = require("../../middlewares/verifyToken")
const verifyAdmin = require("../../middlewares/verifyAdmin")
const router = express.Router();
const {
  getTopApartmentController,
  getAllApartmentController,
  getAllApprovedApartmentController,
  getAllApartmentAccordingSearchController,
  addApartmentController,
  getAllApartmentsByAUserController,
  deleteAnApartmentController,
  updateAdminApprovalController,
  deleteApartmentByAUserController
} = require("./apartment.controller");

// admin only route
router.get("/all-apartments",verifyToken,verifyAdmin, getAllApartmentController);
router.patch("/update-adminApproval/:apartmentId",verifyToken,verifyAdmin, updateAdminApprovalController);
router.delete("/delete-apartment/:apartmentId",verifyToken,verifyAdmin, deleteAnApartmentController);
// users route
router.post("/add-apartment",verifyToken,addApartmentController)
router.get("/user-apartments",verifyToken,getAllApartmentsByAUserController)
router.delete("/user-apartment-delete/:apartmentId",verifyToken,deleteApartmentByAUserController)
// public routes
router.get("/top-apartments", getTopApartmentController);
router.get("/approved-apartments", getAllApprovedApartmentController);
router.get("/search-apartments", getAllApartmentAccordingSearchController);


module.exports = router;