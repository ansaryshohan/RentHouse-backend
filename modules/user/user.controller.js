const { createUserDataIntoDB } = require("./user.service");

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

module.exports = {
  createUserController,
};
