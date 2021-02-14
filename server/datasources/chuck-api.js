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
}

module.exports = ChuckApi;