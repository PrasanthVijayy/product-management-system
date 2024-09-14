import Category from "../../common/models/categoryModel.js";

module.exports = {
    checkExistance: async (payload) => {
        try {
            console.log("Repository - Category: checkExistance - Initiated");
            return new Promise((resolve, reject) => {
                Category.findOne(payload, (err, data) => {
                    if (err) {
                        console.log("Repository - Category: checkExistance - Error");
                        reject(err);
                    } else {
                        console.log("Repository - Category: checkExistance - Ended");
                        resolve(data);
                    }
                });
            });
        } catch {
            console.log("Repository - Category: checkExistance - Error");
            throw new Error(error);
        }
    },

    createCategory: async (payload) => {
        try {
            console.log("Repository - Category: createCategory - Initiated");
            return new Promise((resolve, reject) => {
                Category.create(payload, (err, data) => {
                    if (err) {
                        console.log("Repository - Category: createCategory - Error");
                        reject(err);
                    } else {
                        console.log("Repository - Category: createCategory - Ended");
                        resolve(data);
                    }
                });
            });
        } catch {
            console.log("Repository - Category: createCategory - Error");
            throw new Error(error);
        }
    },


}