import { request } from 'graphql-request';
import useSWR from 'swr';

function Product({ id, name }) {
  const { data, mutate } = useSWR(
    [
      `query productVotesCount($id: ID!) {
        graphcms {
          productVotes: votesConnection(where: {product: {id: $id}}) {
            aggregate {
              count
            }
          }
        }
      }`,
      id,
    ],
    (query, id) =>
      request(
        'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6',
        query,
        { id }
      ),
    { revalidateOnFocus: false }
  );

  async function handleClick() {
    const newCount = data.graphcms.productVotes.aggregate.count + 1;

    mutate(
      { ...data, productVotes: { aggregate: { count: newCount } } },
      false
    );

    await fetch('/api/upvote', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  }

  return (
    <React.Fragment>
      <h1>{name}</h1>
      <button onClick={handleClick} disabled={!data}>
        {data ? data.graphcms.productVotes.aggregate.count : 'Loading'}
      </button>
    </React.Fragment>
  );
}

export default Product;
