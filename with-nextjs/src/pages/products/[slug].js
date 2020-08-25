import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6'
);

export async function getStaticProps({ params }) {
  const { graphcms: { product } } = await graphcms.request(
    `
    query ProductPageQuery($slug: String!) {
      graphcms {
        product(where: { slug: $slug }) {
          name
          description
          price
        }
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { graphcms: { products } } = await graphcms.request(`
    {
      graphcms {
        products {
          slug
          name
        }
      }
    }
  `);

  return {
    paths: products.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default ({ product }) => (
  <React.Fragment>
    <h1>{product.name}</h1>
    <p>{product.description}</p>
    <p>{product.price / 100}</p>
  </React.Fragment>
);
