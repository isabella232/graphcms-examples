import { request } from 'graphql-request';

import Product from '../components/product';

function Index({ products }) {
  const Component = (product, index) => <Product key={index} {...product} />;

  return products.map(Component);
}

export async function getStaticProps() {
  const { graphcms: { products } } = await request(
    'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6',
    `{
      graphcms {
        products {
          id
          name
        }
      }
    }`
  );

  return {
    props: {
      products,
    },
  };
}

export default Index;
