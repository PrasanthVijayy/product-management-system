import User from "../../common/models/userModel.js";

class UserRepo  {
  async checkUser(field, value) {
    try {
      console.log("Repository - Auth: checkUser - Initiated");
      let whereCondition = {};
      whereCondition[field] = value;

      const user = await User.findOne({ where: whereCondition });
      return user
    } catch (error) {
      console.log("Repository - Auth: checkUser - Error");
      throw new Error(error);
    }
  }
  async register(payload) {
    try {
      console.log("Repository - Auth: register - Initiated");
      const user = await User.create(payload);
      return user;
    } catch (error) {
      console.log("Repository - Auth: register - Error");
      throw new Error(error);
    }
  }

   async login(payload) {
    try {
      console.log("Repository - Auth: login - Initiated");
      const user = await User.findOne({ where: payload });
      return user;
    } catch (error) {
      console.log("Repository - Auth: login - Error");
      throw new Error(error);
    }
  }
}

export default UserRepo;
