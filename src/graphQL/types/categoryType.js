import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
    createdBy: String!
  }

  type CategoryResponse {
    message: String!
    category: Category
  }

  type CategoriesResponse {
    total: Int!
    categories: [Category!]!
  }

  input CategoryInput {
    name: String!
  }

  type Query {
    getCategories(page: Int, limit: Int): CategoriesResponse!
    getCategoryById(id: ID!): CategoryResponse!
  }

  type Mutation {
    createCategory(input: CategoryInput!): CategoryResponse!
    updateCategory(id: ID!, input: CategoryInput!): CategoryResponse!
    deleteCategory(id: ID!): CategoryResponse!
  }
`;

export default typeDefs;
