const UserModel = require("../modules/user/user.model");

const verifyAdmin = async (req, res, next) => {
  const userEmail = req?.user?.userEmail;
  
  const findUser = await UserModel.findOne({ email: userEmail });
  if (findUser?.role !== "admin") {
    res
      .status(403)
      .json({ status: "error", data: null, message: "forbidden access" });
    return;
  }
  next();
};

module.exports = verifyAdmin;
