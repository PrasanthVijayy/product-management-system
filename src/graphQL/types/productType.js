import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Product {
    product_id: ID!
    name: String!
    description: String
    price: Float!
    stock_quantity: Int!
    category_id: ID!
    category: Category
    status: String!
    createdBy: String!
    createdAt: String!
  }

  input CreateProductInput {
    name: String!
    price: Float!
    stock_quantity: Int!
    category: String!
    description: String
  }

  input UpdateProductInput {
    name: String
    price: Float
    stock_quantity: Int
    category: String
    status: String
    description: String
  }

  type Query {
    getProduct(id: ID!): Product
    getProducts(
      categoryId: ID
      sortBy: String
      sortOrder: String
      status: String
      name: String
      page: Int
      pageSize: Int
    ): ProductPagination
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    deleteProduct(id: ID!): String
  }

  type ProductPagination {
    total: Int
    products: [Product]
  }
`;

export default typeDefs;
