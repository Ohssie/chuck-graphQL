const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    categories: [String!]
  }
`;

module.exports = typeDefs;