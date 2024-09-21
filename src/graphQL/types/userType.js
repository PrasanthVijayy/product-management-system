import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    uid: String!
    username: String!
    email: String!
    role: String!
  }

  type AuthResponse {
    uid: String!
    username: String!
    role: String!
    accessToken: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    # Example Query: Fetch user by UID (add if needed)
    getUser(uid: String!): User
  }

  type Mutation {
    register(input: RegisterInput!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
  }
`;

export default typeDefs;
