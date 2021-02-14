const { RESTDataSource } = require('apollo-datasource-rest');

class ChuckApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.chucknorris.io/';
  }

  /** Make a call to retrieve all the joke categories */
  async getAllCategories() {
    const data = await this.get('jokes/categories');
    return data;
  }

  async getJokeByCategory({ categoryName }) {
    const response = await this.get('jokes/random', { category : categoryName });
    return this.categoryReducer(response);
  }

  categoryReducer(category) {
    return {
      categories: [
        category.categories,
      ],
      created_at: category.created_at,
      icon_url: category.icon_url,
      id: category.id,
      updated_at: category.updated_at,
      url: category.url,
      value: category.value
    }
  }
}

module.exports = ChuckApi;