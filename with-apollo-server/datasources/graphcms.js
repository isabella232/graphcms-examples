const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql } = require('apollo-server');

const getProductsQuery = gql`
  {
    graphcms {
      products {
        id
        description
        name
        price
        slug
      }
    }
  }
`;

class GraphCMSAPI extends GraphQLDataSource {
  constructor() {
    super();

    this.baseURL =
      'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6';
  }

  async getProducts() {
    const { data } = await this.query(getProductsQuery);

    return data.graphcms.products;
  }
}

module.exports = GraphCMSAPI;
