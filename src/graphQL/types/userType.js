// src/graphql/types/userType.js
import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  # Define the User type
  type User {
    uid: ID!
    username: String!
    email: String!
    role: String!
    access_token: String
  }

  # Input type for registering a new user
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    role: String!
  }

  # Input type for login
  input LoginInput {
    email: String!
    password: String!
  }

  # Query type for logging in users
  type Query {
    login(input: LoginInput!): User!
  }

  # Mutation type for registering a new user and logging in a user
  type Mutation {
    register(input: RegisterInput!): User!
    login(input: LoginInput!): User! # Correctly placed here
  }
`;

export default userTypeDefs;
