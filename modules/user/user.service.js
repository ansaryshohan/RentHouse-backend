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
    // find the user
    const userFound = await UserModel.findOne(
      { email: userEmail },
      { email: 1, role: 1, _id: 1 }
    );
    if (userFound) {
      return userFound;
    }
    return "No User Found";
  } catch (error) {
    throw new Error(error.message);
  }
};
// get all the users
const getAllUsersFromDB = async () => {
  try {
    // find the user
    const users = await UserModel.find({});
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUserDataIntoDB,
  getUserRoleFromDB,
  getAllUsersFromDB,
};
