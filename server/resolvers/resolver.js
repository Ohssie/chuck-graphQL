
module.exports = {
  Query: {
    categories: (_, __, { dataSources }) => dataSources.jokeCategories.getAllCategories(),
  }
}