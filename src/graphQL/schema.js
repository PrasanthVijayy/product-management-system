import { gql } from "apollo-server-express";
import userType from "./types/userType.js";
import productType from "./types/productType.js";
import categoryType from "./types/categoryType.js";
import resolvers from "./resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = gql`
  ${userType}
  ${productType}
  ${categoryType}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
