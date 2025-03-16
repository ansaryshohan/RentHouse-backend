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
    // first check apartment availability
    if (!checkApartmentAvailability) {
      return "apartment unavailable";
    }
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

// get a unpaid agreement of a user
const getSingleUnPaidAgreementDataFromDB = async (userEmail) => {
  try {
    const singleAgreement = await AgreementModel.find({
      userEmail,
      payment: "unpaid",
    });
    return singleAgreement;
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete an agreement from the database by user
const deleteAnAgreementByUserFromDB = async (agreementId, userEmail) => {
  console.log(agreementId, userEmail);
  try {
    const findAgreement = await AgreementModel.findOne({ _id: agreementId });

    if (findAgreement?.userEmail === userEmail) {
      const deletedData = await AgreementModel.deleteOne({ _id: agreementId });

      // update the apartment availability to true
      const updateApartment = await ApartmentModel.updateOne(
        { _id: findAgreement?.apartmentId },
        { $set: { availability: true } }
      );
      return deletedData;
    }
    return "forbidden access";
  } catch (error) {
    throw new Error(error.message);
  }
};

// get all the agreement for admin-----
const getAllAgreementDataFromDB = async (
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
    const allAgreements = await AgreementModel.find({})
      .sort(sortQuery)
      .skip(pageNo * perPageData)
      .limit(perPageData);
    const totalNoOfAgreements = await AgreementModel.countDocuments();
    return { allAgreements, totalNoOfAgreements };
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

module.exports = {
  addAgreementInDB,
  getAllAgreementDataFromDB,
  getSingleUnPaidAgreementDataFromDB,
  deleteAnAgreementByUserFromDB,
};
