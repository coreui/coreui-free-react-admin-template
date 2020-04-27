import { gql } from "apollo-boost";

export const SIGNIN_USER = gql`
  mutation($userName: String!, $password: String!) {
    signinUser(userName: $userName, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation(
    $userName: String!
    $password: String!
    $email: String!
    $companyName: String!
    $firstName: String!
    $lastName: String!
  ) {
    signupUser(
      userName: $userName
      password: $password
      email: $email
      companyName: $companyName
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;
