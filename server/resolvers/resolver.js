const { GraphQLScalarType, Kind } = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');

module.exports = {
  Query: {
    categories: (_, __, { dataSources }) => dataSources.jokeCategories.getAllCategories(),
    joke: (_, { category }, { dataSources }) => dataSources.jokeCategories.getJokeByCategory({ categoryName: category })
  },
  JSON: GraphQLJSON,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return Date.parse(value);
      // return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
      return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
      }
      return null; // Invalid hard-coded value (not an integer)
    }
  }),
}