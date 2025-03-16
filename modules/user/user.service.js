const UserModel = require("./user.model");

const createUserDataIntoDB = async (userData) => {
  try {
    // find the user
    const userFound = await UserModel.findOne({ email: userData.email });
    if (!userFound) {
      const user = new UserModel(userData);
      await user.save();
      return user;
    }
    return "user already exits";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserRoleFromDB = async (userEmail) => {
  try {
    if(userEmail){
      // find the user
    const userFound = await UserModel.findOne(
      { email: userEmail },
      { email: 1, role: 1, _id: 1 }
    );
    if (userFound) {
      const isAdmin= userFound?.role ==="admin";
      return isAdmin
    }
    return false;
    }
    return false;
    
  } catch (error) {
    throw new Error(error.message);
  }
};
// get all the users
const getAllUsersFromDB = async (pageNo = 0, perPageData = 0) => {
  try {
    // find the user
    const users = await UserModel.find({})
      .skip(pageNo * perPageData)
      .limit(perPageData);
    const totalNoOfUsers = await UserModel.countDocuments();
    return { users, totalNoOfUsers };
  } catch (error) {
    throw new Error(error.message);
  }
};
// update user role
const updateUserRoleInDB = async (userId) => {
  try {
    // find the user
    const updateData = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { role: "admin" } }
    );
    return updateData;
  } catch (error) {
    throw new Error(error.message);
  }
};
// update user role
const deleteUserInDB = async (userId) => {
  // console.log(userId);
  try {
    // find the user
    const deletedUser = await UserModel.findOneAndDelete({ _id: userId });
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUserDataIntoDB,
  getUserRoleFromDB,
  getAllUsersFromDB,
  updateUserRoleInDB,
  deleteUserInDB,
};
