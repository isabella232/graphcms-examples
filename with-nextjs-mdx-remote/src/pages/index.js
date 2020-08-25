import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6'
  );

  const { graphcms: { products } } = await graphcms.request(
    `
      { 
        graphcms {
          products {
            slug
            name
          }
        }
      }
    `
  );

  return {
    props: {
      products,
    },
  };
}

const IndexPage = ({ products }) => {
  return products.map(({ slug, name }) => (
    <Link key={slug} href={`/products/${slug}`}>
      <a>{name}</a>
    </Link>
  ));
};

export default IndexPage;
