const { createUserDataIntoDB,getUserRoleFromDB,getAllUsersFromDB } = require("./user.service");

const createUserController = async (req, res) => {
  const userData = req.body;
  try {
    const userDataRes = await createUserDataIntoDB(userData);
    return res
      .status(201)
      .json({ status: "success", data: userDataRes, message: "user created" });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

const getUserRoleController= async(req,res)=>{
  const {userEmail} = req.params;
  try {
    const userData = await getUserRoleFromDB(userEmail);
    return res
      .status(201)
      .json({ status: "success", data: userData, message: "user created" });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
}
const getAllUsersController= async(req,res)=>{
  try {
    const usersData = await getAllUsersFromDB();
    return res
      .status(201)
      .json({ status: "success", data: usersData, message: "user created" });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
}

module.exports = {
  createUserController,
  getUserRoleController,
  getAllUsersController
};
