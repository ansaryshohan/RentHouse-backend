const UserModel = require("./user.model");

const createUserDataIntoDB=async(userData)=>{
  try {
    // find the user 
    const userFound= await UserModel.findOne({email: userData.email});
    if(!userFound){
      const user= new UserModel(userData);
      await user.save();
      return user;
    }
    return "user already exits"
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createUserDataIntoDB
};