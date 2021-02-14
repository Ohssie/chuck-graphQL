const express = require('express');
const { ApolloServer, gql }= require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

/** Initialize Apollo server and pass the type definitions (GraphQL schema),
 * resolver functions for the schema fields and lastly the datasource (which is 
 * Chuck Norris APi in this case)
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({

  })
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => 
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);