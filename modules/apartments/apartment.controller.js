const {
  getTopApartmentsDataFromDB,
  getAllApartmentDataFromDB,
  getApprovedApartmentDataFromDB,
  getAllApartmentLocationSearchFromDB
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
  const { perPageData, pageNo } = req.query;
  // console.log(req.query,Number(pageNo),Number(perPageData));
  try {
    const { allApartments, totalNoOfApartments } = await getAllApartmentDataFromDB(
      Number(pageNo),
      Number(perPageData)
    );
    return res
      .status(200)
      .json({ status: "success", data: { allApartments, totalNoOfApartments } });
  } catch (error) {
    return res.status(500).json({ status: "success", error });
  }
};

// get all approved cars data-------------
const getAllApprovedApartmentController = async (req, res) => {
  const { perPageData, pageNo,priceSort,apartmentType,searchText } = req.query;
  // console.log(req.query);
  try {
    const { allApartments, totalNoOfApartments }= await getApprovedApartmentDataFromDB(
      Number(pageNo),
      Number(perPageData),
      priceSort,
      apartmentType,
      searchText
    );
    return res
      .status(200)
      .json({ status: "success", data: { allApartments, totalNoOfApartments } });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

// get all available apartment location according to search-------------
const getAllApartmentAccordingSearchController = async (req, res) => {
  const {searchText}= req.query;
  try {
    const apartmentLocationData = await getAllApartmentLocationSearchFromDB(searchText);
    return res
      .status(200)
      .json({ status: "success", data: apartmentLocationData, message:"carModel according to search successfully"});
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};


// get a single car data-------------
const getSingleCarController = async (req, res) => {
  const { carId } = req.params;
  try {
    const data = await getSingleCarDataFromDB(carId);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    return res.status(500).json({ status: "success", error });
  }
};
// get all the car data by a user-------------
const getAllCarsByAUserController = async (req, res) => {
  const { userEmail } = req.query;
  // console.log(req.query);
  // first verify the token data---
  if (userEmail !== req?.user?.userEmail) {
    return res
      .status(403)
      .json({ status: "success", data: null, message: "Forbidden access" });
  }
  try {
    const { allCarsByUser, totalNoOfCars } = await getAllCarsByAUserDataFromDB(
      userEmail
    );
    // console.log(allCarsByUser)
    return res.status(200).json({
      status: "success",
      data: { allCarsByUser, totalNoOfCars },
      message: "User cars access successful",
    });
  } catch (error) {
    return res.status(500).json({ status: "success", error });
  }
};



// add a car in the database-----------
const addACarController = async (req, res) => {
  const carData = req.body;
  // console.log(carData)
  // first verify the token data---
  if (carData?.addedBy?.email !== req?.user?.userEmail) {
    return res
      .status(403)
      .json({ status: "error", data: null, message: "Forbidden access" });
  }
  try {
    const carDataAdding = await addACarToDB(carData);
    // console.log(carDataAdding);
    return res.status(201).json({ status: "success", data: carDataAdding ,message: "car added successfully"});
  } catch (error) {
    return res.status(500).json({ status: "error", data: error.message });
  }
};
// delete a car from the database-----------
const deleteACarController = async (req, res) => {
  const { carId } = req.params;
  const { userEmail } = req.body;
  // first verify the token data---
  if (userEmail !== req?.user?.userEmail) {
    return res
      .status(403)
      .json({ status: "success", data: null, message: "Forbidden access" });
  }
  try {
    const { deletedData, carDataAfterDelete } = await deleteACarFromDB(
      carId,
      userEmail
    );
    // console.log(carDataAdding)
    return res.status(200).json({
      status: "success",
      data: { deletedData, carDataAfterDelete },
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
};