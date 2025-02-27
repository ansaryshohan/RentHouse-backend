const ApartmentModel = require("./apartment.model");

const getTopApartmentsDataFromDB = async () => {
  try {
    const topApartments = await ApartmentModel.find({})
      .sort({ price: -1 })
      .limit(6);
    // console.log(topCars);
    return topApartments;
  } catch (error) {
    throw new Error(error.message);
  }
};
// get all the apartments
const getAllApartmentDataFromDB = async (
  pageNo = 0,
  perPageData = 0,
  priceSort = ""
) => {
  const sortQuery = {};
  if (priceSort === "price_asc") {
    sortQuery.price = 1;
  }
  if (priceSort === "price_dsc") {
    sortQuery.price = -1;
  }
  try {
    const allApartments = await ApartmentModel.find({})
      .sort(sortQuery)
      .skip(pageNo * perPageData)
      .limit(perPageData);
    // console.log(allCars);
    const totalNoOfApartments = await ApartmentModel.countDocuments();
    // console.log(totalNoOfCars);
    return { allApartments, totalNoOfApartments };
  } catch (error) {
    throw new Error(error.message);
  }
};
// get all the approved apartments
const getApprovedApartmentDataFromDB = async (
  pageNo = 0,
  perPageData = 0,
  priceSort = "",
  apartmentType = "",
  searchText = ""
) => {
  // Setting the base query
  const apartmentDataFindQuery = {
    adminApproval: "approved",
  };

  if (apartmentType) {
    apartmentDataFindQuery.category = apartmentType;
  }

  // **Search in apartment location field only**
  if (searchText?.trim()) {
    apartmentDataFindQuery.location = { $regex: searchText, $options: "i" };
  }

  const priceSortQuery = {};
  if (priceSort === "price_asc") {
    priceSortQuery.price = 1;
  }
  if (priceSort === "price_dsc") {
    priceSortQuery.price = -1;
  }

  try {
    const allApartments = await ApartmentModel.find(apartmentDataFindQuery)
      .sort(priceSortQuery)
      .skip(pageNo * perPageData)
      .limit(perPageData);
    // console.log(allCars);
    const totalNoOfApartments = await ApartmentModel.countDocuments(
      apartmentDataFindQuery
    );
    // console.log(totalNoOfCars);
    return { allApartments, totalNoOfApartments };
  } catch (error) {
    throw new Error(error.message);
  }
};

// get apartment location according to search
const getAllApartmentLocationSearchFromDB = async (searchText = "") => {
  const allApartmentsLocation = await ApartmentModel.aggregate([
    {
      $search: {
        index: "apartmentLocationIndex",
        text: {
          query: searchText,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        apartmentLocation: { $first: "$location" },
      },
    },
  ]);
  // console.log(allCarsModels);
  return allApartmentsLocation;
};

// get a single car by id
const getSingleCarDataFromDB = async (carId) => {
  try {
    const singleCar = await ApartmentModel.findOne({ _id: carId });
    return singleCar;
  } catch (error) {
    throw new Error(error.message);
  }
};
// user all added car based on email
const getAllCarsByAUserDataFromDB = async (userEmail) => {
  try {
    const allCarsByUser = await ApartmentModel.find({
      "addedBy.email": userEmail,
    });
    // console.log(allCars);
    const totalNoOfCars = await ApartmentModel.countDocuments({
      "addedBy.email": userEmail,
    });
    // console.log(totalNoOfCars);
    return { allCarsByUser, totalNoOfCars };
  } catch (error) {
    throw new Error(error.message);
  }
};

// add apartment to the database
const addApartmentInDB = async (apartmentData) => {
  try {
    const dataAdding = new ApartmentModel(apartmentData);
    // console.log(dataAdding);
    await dataAdding.save();
    return dataAdding;
  } catch (error) {
    throw new Error(error.message);
  }
};
// update adminApproval of apartment in the database
const updateAdminApprovalInDB = async (apartmentId, adminApproval) => {
  try {
    const find = await ApartmentModel.findOne({_id:apartmentId})
    const updateApartment = await ApartmentModel.updateOne(
      { _id: apartmentId },
      { $set: { adminApproval } }
    );
    // console.log(find,updateApartment);
    return updateApartment;
  } catch (error) {
    throw new Error(error.message);
  }
};
// delete an apartment from the database
const deleteAnApartmentFromDB = async (apartmentId) => {
  try {
    const findApartment = await ApartmentModel.findOne({ _id: apartmentId });
    if (findApartment) {
      const deletedData = await ApartmentModel.deleteOne({ _id: apartmentId });

      return deletedData;
    }
    return { deletedCount: 0 };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getTopApartmentsDataFromDB,
  getAllApartmentDataFromDB,
  getApprovedApartmentDataFromDB,
  getAllApartmentLocationSearchFromDB,
  addApartmentInDB,
  deleteAnApartmentFromDB,
  updateAdminApprovalInDB,
};
