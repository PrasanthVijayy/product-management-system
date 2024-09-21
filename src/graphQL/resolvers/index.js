import productResolver from "./productResolver.js";
import categoryResolver from "./categoryResolver.js";
import userResolver from "./userResolver.js";

const resolvers = {
  Query: {
    ...productResolver.Query,
    ...categoryResolver.Query,
    ...userResolver.Query,  
  },
  Mutation: {
    ...productResolver.Mutation,
    ...categoryResolver.Mutation,
    ...userResolver.Mutation,
  },
};

export default resolvers;
