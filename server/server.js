const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const JokeCategories = require('./datasources/chuck-api');
const resolvers = require('./resolvers/resolver');

/** Initialize Apollo server and pass the type definitions (GraphQL schema),
 * resolver functions for the schema fields and lastly the datasource (which is 
 * Chuck Norris APi in this case)
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    jokeCategories: new JokeCategories()
  })
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => 
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);