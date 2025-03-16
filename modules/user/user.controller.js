const {
  createUserDataIntoDB,
  getUserRoleFromDB,
  getAllUsersFromDB,
  updateUserRoleInDB,
  deleteUserInDB,
} = require("./user.service");

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

const getUserRoleController = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const userData = await getUserRoleFromDB(userEmail);
    return res
      .status(201)
      .json({ status: "success", data: userData, message: "user role found" });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};
const getAllUsersController = async (req, res) => {
  const { perPageData, pageNo } = req.query;
  try {
    const { users, totalNoOfUsers } = await getAllUsersFromDB(Number(pageNo),
    Number(perPageData));
    return res
      .status(201)
      .json({
        status: "success",
        data: { users, totalNoOfUsers },
        message: "user created",
      });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

const updateUserRoleController = async (req, res) => {
  const { userId } = req.params;
  try {
    const updateData = await updateUserRoleInDB(userId);
    return res
      .status(201)
      .json({ status: "success", data: updateData, message: "user updated" });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

const deleteUserController = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  try {
    const deleteData = await deleteUserInDB(userId);
    return res
      .status(200)
      .json({ status: "success", data: deleteData, message: "user deleted" });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
};

module.exports = {
  createUserController,
  getUserRoleController,
  getAllUsersController,
  updateUserRoleController,
  deleteUserController,
};
