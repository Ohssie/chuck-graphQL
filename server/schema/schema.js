const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  scalar JSON

  type Joke {
    categories: JSON!
    created_at: Date!
    icon_url: String!
    id: String!
    updated_at: Date!
    url: String!
    value: String!
  },
  type Query {
    categories: [String!] 
    joke(category: String!): Joke!
  }
`;

module.exports = typeDefs;