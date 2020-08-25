import { GraphQLClient } from 'graphql-request';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import he from 'he';

import Test from '../../components/test';

const graphcms = new GraphQLClient(
  'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6'
);

const components = {
  h2: (props) => <h2 style={{ color: 'red' }} {...props} />,
  Test,
};

export async function getStaticProps({ params }) {
  const { graphcms: { product } } = await graphcms.request(
    `
    query ProductPageQuery($slug: String!) {
      graphcms {
        product(where: { slug: $slug }) {
          name
          content {
            markdown
          }
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
      product: {
        mdx: await renderToString(
          he.decode(product.content.markdown),
          components
        ),
        ...product,
      },
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

const ProductPage = ({ product }) => {
  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      {hydrate(product.mdx, components)}
      <p>{product.price / 100}</p>
    </React.Fragment>
  );
};

export default ProductPage;
