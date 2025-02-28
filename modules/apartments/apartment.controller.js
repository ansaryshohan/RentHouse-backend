const {
  getTopApartmentsDataFromDB,
  getAllApartmentDataFromDB,
  getApprovedApartmentDataFromDB,
  getAllApartmentLocationSearchFromDB,
  addApartmentInDB,
  getAllApartmentsByAUserDataFromDB,
  getSingleApartmentDataFromDB,
  deleteAnApartmentFromDB,
  updateAdminApprovalInDB,
  deleteAnApartmentByUserFromDB,
} = require("./apartment.service");

// get the top six apartment data---------------
const getTopApartmentController = async (req, res) => {
  try {
    const topApartments = await getTopApartmentsDataFromDB();
    return res.status(200).json({ status: "success", data: topApartments });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

// get all the apartments data-------------
const getAllApartmentController = async (req, res) => {
  const { perPageData, pageNo, priceSort } = req.query;
  // console.log(req.query,Number(pageNo),Number(perPageData));
  try {
    const { allApartments, totalNoOfApartments } =
      await getAllApartmentDataFromDB(
        Number(pageNo),
        Number(perPageData),
        priceSort
      );
    return res
      .status(200)
      .json({
        status: "success",
        data: { allApartments, totalNoOfApartments },
      });
  } catch (error) {
    return res.status(500).json({ status: "success", error });
  }
};

// get all the apartments data added  by a user-------------
const getAllApartmentsByAUserController = async (req, res) => {
  const { userEmail, perPageData, pageNo, priceSort } = req.query;
  // console.log(req.query);
  // first verify the token data---
  if (userEmail !== req?.user?.userEmail) {
    return res
      .status(403)
      .json({ status: "success", data: null, message: "Forbidden access" });
  }
  try {
    const { allApartmentsByUser, totalNoOfApartmentsByUser } =
      await getAllApartmentsByAUserDataFromDB(
        userEmail,
        Number(pageNo),
        Number(perPageData),
        priceSort
      );
    // console.log(allCarsByUser)
    return res.status(200).json({
      status: "success",
      data: { allApartmentsByUser, totalNoOfApartmentsByUser },
      message: "User apartments access successful",
    });
  } catch (error) {
    return res.status(500).json({ status: "success", error });
  }
};

// get all approved apartments data-------------
const getAllApprovedApartmentController = async (req, res) => {
  const { perPageData, pageNo, priceSort, apartmentType, searchText } =
    req.query;
  // console.log(req.query);
  try {
    const { allApartments, totalNoOfApartments } =
      await getApprovedApartmentDataFromDB(
        Number(pageNo),
        Number(perPageData),
        priceSort,
        apartmentType,
        searchText
      );
    return res
      .status(200)
      .json({
        status: "success",
        data: { allApartments, totalNoOfApartments },
      });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

// get all available apartment location according to search-------------
const getAllApartmentAccordingSearchController = async (req, res) => {
  const { searchText } = req.query;
  try {
    const apartmentLocationData = await getAllApartmentLocationSearchFromDB(
      searchText
    );
    return res
      .status(200)
      .json({
        status: "success",
        data: apartmentLocationData,
        message: "carModel according to search successfully",
      });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

// get a single apartment data-------------
const getSingleApartmentController = async (req, res) => {
  const { apartmentId } = req.params;
  try {
    const data = await getSingleApartmentDataFromDB(apartmentId);
    return res
      .status(200)
      .json({ status: "success", data, message: "data found success" });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

// update an apartment admin approval in the database-----------
const updateAdminApprovalController = async (req, res) => {
  const { apartmentId } = req.params;
  const { adminApproval, userEmail } = req.body;
  // console.log(adminApproval,userEmail,apartmentId)
  // first verify the token data---
  if (userEmail !== req?.user?.userEmail) {
    return res
      .status(403)
      .json({ status: "error", data: null, message: "Forbidden access" });
  }
  try {
    const apartmentDataUpdate = await updateAdminApprovalInDB(
      apartmentId,
      adminApproval
    );
    // console.log(apartmentDataAdding);
    return res
      .status(200)
      .json({
        status: "success",
        data: apartmentDataUpdate,
        message: "car added successfully",
      });
  } catch (error) {
    return res.status(500).json({ status: "error", data: error.message });
  }
};
// add a apartment in the database-----------
const addApartmentController = async (req, res) => {
  const apartmentData = req.body;
  // console.log(apartmentData)
  // first verify the token data---
  if (apartmentData?.addedBy?.email !== req?.user?.userEmail) {
    return res
      .status(403)
      .json({ status: "error", data: null, message: "Forbidden access" });
  }
  try {
    const apartmentDataAdding = await addApartmentInDB(apartmentData);
    // console.log(apartmentDataAdding);
    return res
      .status(201)
      .json({
        status: "success",
        data: apartmentDataAdding,
        message: "car added successfully",
      });
  } catch (error) {
    return res.status(500).json({ status: "error", data: error.message });
  }
};
// delete an apartment from the database by admin-----------
const deleteAnApartmentController = async (req, res) => {
  const { apartmentId } = req.params;
  const { userEmail } = req.body;
  console.log(apartmentId, userEmail);
  // first verify the token data---
  if (userEmail !== req?.user?.userEmail) {
    return res
      .status(403)
      .json({ status: "error", data: null, message: "Forbidden access" });
  }
  try {
    const deletedData = await deleteAnApartmentFromDB(apartmentId);
    // console.log(carDataAdding)
    return res.status(200).json({
      status: "success",
      data: deletedData,
      message: "car deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", data: error.message });
  }
};
// delete an apartment by a user from the database-----------
const deleteApartmentByAUserController = async (req, res) => {
  const { apartmentId } = req.params;
  const { userEmail } = req.body;
  // console.log(apartmentId,userEmail)
  // first verify the token data---
  if (userEmail !== req?.user?.userEmail) {
    return res
      .status(403)
      .json({ status: "error", data: null, message: "Forbidden access" });
  }
  try {
    const deletedData = await deleteAnApartmentByUserFromDB(
      apartmentId,
      userEmail
    );
    // console.log(carDataAdding)
    if (deletedData === "forbidden access") {
      return res
        .status(403)
        .json({ status: "error", data: null, message: "Forbidden access" });
    }
    return res.status(200).json({
      status: "success",
      data: deletedData,
      message: "car deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", data: error.message });
  }
};

module.exports = {
  getTopApartmentController,
  getAllApartmentController,
  getAllApprovedApartmentController,
  getAllApartmentAccordingSearchController,
  addApartmentController,
  getAllApartmentsByAUserController,
  getSingleApartmentController,
  deleteAnApartmentController,
  updateAdminApprovalController,
  deleteApartmentByAUserController,
};
