const express = require('express');
const { AwesomeGraphQLClient } = require('awesome-graphql-client');
const fetch = require('node-fetch');

const client = new AwesomeGraphQLClient({
  endpoint:
    'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6',
  fetch,
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', async function (_, res) {
  const query = `
    { 
      graphcms {
        products {
          name
          slug
        }
      }
    }
  `;

  const { graphcms: { products } } = await client.request(query);

  res.render('index', { products });
});

app.get('/products/:slug', async function (req, res) {
  const query = `
    query ProductPageQuery($slug: String!) {
      graphcms {
        product(where: { slug: $slug }) {
          name
          description
          price
        }
      }
    }
  `;

  const { slug } = req.params;

  const { graphcms: { product } } = await client.request(query, { slug });

  res.render('product', { product });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`));
