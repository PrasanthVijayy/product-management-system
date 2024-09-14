import Products from "../../common/models/productModel.js";

module.exports = {
  checkExistance: async (payload) => {
    try {
      console.log("Repository - Product: checkExistance - Initiated");
      return new Promise((resolve, reject) => {
        Products.findOne(payload, (err, data) => {
          if (err) {
            console.log("Repository - Product: checkExistance - Error");
            reject(err);
          } else {
            console.log("Repository - Product: checkExistance - Ended");
            resolve(data);
          }
        });
      });
    } catch {
      console.log("Repository - Product: checkExistance - Error");
      throw new Error(error);
    }
  },

  createProduct: async (payload) => {
    try {
      console.log("Repository - Product: createProduct - Initiated");
      return new Promise((resolve, reject) => {
        Products.create(payload, (err, data) => {
          if (err) {
            console.log("Repository - Product: createProduct - Error");
            reject(err);
          } else {
            console.log("Repository - Product: createProduct - Ended");
            resolve(data);
          }
        });
      });
    } catch {
      console.log("Repository - Product: createProduct - Error");
      throw new Error(error);
    }
  },

  getProducts: async (payload) => {
    try {
      console.log("Repository - Product: getProducts - Initiated");
      return new Promise((resolve, reject) => {
        Products.find(payload, (err, data) => {
          if (err) {
            console.log("Repository - Product: getProducts - Error");
            reject(err);
          } else {
            console.log("Repository - Product: getProducts - Ended");
            resolve(data);
          }
        });
      });
    } catch {
      console.log("Repository - Product: getProducts - Error");
      throw new Error(error);
    }
  },

  getProduct: async (payload) => {
    try {
      console.log("Repository - Product: getProduct - Initiated");
      return new Promise((resolve, reject) => {
        Products.findOne(payload, (err, data) => {
          if (err) {
            console.log("Repository - Product: getProduct - Error");
            reject(err);
          } else {
            console.log("Repository - Product: getProduct - Ended");
            resolve(data);
          }
        });
      });
    } catch {
      console.log("Repository - Product: getProduct - Error");
      throw new Error(error);
    }
  },

  updateProduct: async (payload) => {
    try {
      console.log("Repository - Product: updateProduct - Initiated");
      return new Promise((resolve, reject) => {
        Products.findOneAndUpdate(payload, (err, data) => {
          if (err) {
            console.log("Repository - Product: updateProduct - Error");
            reject(err);
          } else {
            console.log("Repository - Product: updateProduct - Ended");
            resolve(data);
          }
        });
      });
    } catch {
      console.log("Repository - Product: updateProduct - Error");
      throw new Error(error);
    }
  },

  deleteProduct: async (payload) => {
    try {
      console.log("Repository - Product: deleteProduct - Initiated");
      return new Promise((resolve, reject) => {
        Products.findOneAndDelete(payload, (err, data) => {
          if (err) {
            console.log("Repository - Product: deleteProduct - Error");
            reject(err);
          } else {
            console.log("Repository - Product: deleteProduct - Ended");
            resolve(data);
          }
        });
      });
    } catch {
      console.log("Repository - Product: deleteProduct - Error");
      throw new Error(error);
    }
  },
};
