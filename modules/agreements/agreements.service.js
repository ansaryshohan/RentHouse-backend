const AgreementModel = require("./agreements.model");
const ApartmentModel = require("../apartments/apartment.model");

// add agreement to the database
const addAgreementInDB = async (agreementData) => {
  try {
    const findAgreementByEmail = await AgreementModel.find({
      userEmail: agreementData?.userEmail,
    });
    const findAgreementByApartmentId = await AgreementModel.findOne({
      apartmentId: agreementData?.apartmentId,
    });

    const checkApartmentAvailability = await ApartmentModel.findOne({
      _id: agreementData?.apartmentId,
      availability: true,
    });
    // console.log(checkApartmentAvailability);
    // first check apartment availability
    if (!checkApartmentAvailability) {
      return "apartment unavailable";
    }
    // console.log(findAgreementByEmail.length,findAgreementByApartmentId)
    // if we find any data with email and apartmentId
    if (findAgreementByEmail.length > 0 || findAgreementByApartmentId) {
      if (findAgreementByEmail.length > 0) {
        const findPaymentStatus = findAgreementByEmail.find(
          (singleAgreement) => singleAgreement.payment === "unpaid"
        );
        if (!findPaymentStatus) {
          const dataAdding = new AgreementModel(agreementData);
          await dataAdding.save();
          // make the apartment unavailable---update the apartment
          const updateApartment = await ApartmentModel.updateOne(
            { _id: agreementData?.apartmentId },
            { $set: { availability: false } }
          );
          return dataAdding;
        }
        return "agreement found by email";
      }
      return "agreement found by apartmentId";
    }

    const newDataAdding = new AgreementModel(agreementData);
    await newDataAdding.save();
    // make the apartment unavailable---update the apartment
    const updateApartment = await ApartmentModel.updateOne(
      { _id: agreementData?.apartmentId },
      { $set: { availability: false } }
    );
    return newDataAdding;
  } catch (error) {
    // console.log(error)
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
    const allApartments = await AgreementModel.find({})
      .sort(sortQuery)
      .skip(pageNo * perPageData)
      .limit(perPageData);
    // console.log(allCars);
    const totalNoOfApartments = await AgreementModel.countDocuments();
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
    const allApartments = await AgreementModel.find(apartmentDataFindQuery)
      .sort(priceSortQuery)
      .skip(pageNo * perPageData)
      .limit(perPageData);
    // console.log(allCars);
    const totalNoOfApartments = await AgreementModel.countDocuments(
      apartmentDataFindQuery
    );
    // console.log(totalNoOfCars);
    return { allApartments, totalNoOfApartments };
  } catch (error) {
    throw new Error(error.message);
  }
};

// get a apartment by id
const getSingleApartmentDataFromDB = async (apartmentId) => {
  try {
    const singleApartment = await AgreementModel.findOne({ _id: apartmentId });
    return singleApartment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// user all added apartments by a user based on email
const getAllApartmentsByAUserDataFromDB = async (
  userEmail = "",
  perPageData = 5,
  pageNo = 0,
  priceSort = ""
) => {
  // console.log(userEmail, perPageData, pageNo, priceSort);
  const sortQuery = {};
  if (priceSort === "price_asc") {
    sortQuery.price = 1;
  }
  if (priceSort === "price_dsc") {
    sortQuery.price = -1;
  }

  // Query to find apartments by user
  const filterQuery = { "addedBy.email": userEmail };

  try {
    const allApartmentsByUser = await AgreementModel.find(filterQuery)
      .sort(sortQuery)
      .skip(pageNo * perPageData)
      .limit(perPageData);
    // console.log(allApartmentsByUser);
    const totalNoOfApartmentsByUser = await AgreementModel.countDocuments(
      filterQuery
    );
    // console.log(totalNoOfApartmentsByUser);
    return { allApartmentsByUser, totalNoOfApartmentsByUser };
  } catch (error) {
    throw new Error(error.message);
  }
};

// update adminApproval of apartment in the database
const updateAdminApprovalInDB = async (apartmentId, adminApproval) => {
  try {
    const find = await AgreementModel.findOne({ _id: apartmentId });
    const updateApartment = await AgreementModel.updateOne(
      { _id: apartmentId },
      { $set: { adminApproval } }
    );
    // console.log(find,updateApartment);
    return updateApartment;
  } catch (error) {
    throw new Error(error.message);
  }
};
// delete an apartment from the database by admin
const deleteAnApartmentFromDB = async (apartmentId) => {
  try {
    const findApartment = await AgreementModel.findOne({ _id: apartmentId });
    if (findApartment) {
      const deletedData = await AgreementModel.deleteOne({ _id: apartmentId });

      return deletedData;
    }
    return { deletedCount: 0 };
  } catch (error) {
    throw new Error(error.message);
  }
};
// delete an apartment from the database by user
const deleteAnApartmentByUserFromDB = async (apartmentId, userEmail) => {
  console.log(apartmentId, userEmail);
  try {
    const findApartment = await AgreementModel.findOne({ _id: apartmentId });

    if (findApartment?.addedBy?.email === userEmail) {
      const deletedData = await AgreementModel.deleteOne({ _id: apartmentId });

      return deletedData;
    }
    return "forbidden access";
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addAgreementInDB };
