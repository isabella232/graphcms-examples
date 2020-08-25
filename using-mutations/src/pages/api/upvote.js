import { GraphQLClient } from 'graphql-request';

export default async ({ body }, res) => {
  const graphcms = new GraphQLClient(
    'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6',
  );

  const { createVote } = await graphcms.request(
    `mutation upvoteProduct($id: ID! $token: String!) {
      graphcms(auths: { graphcmsToken: $token }) {
        createVote(data: { product: { connect: { id: $id } } }) {
          id
        }
      }
    }`,
    { id: body.id, token: process.env.GRAPHCMS_MUTATION_TOKEN }
  );

  await graphcms.request(
    `mutation publishUpvote($id: ID!) {
      graphcms(auths: { graphcmsToken: $token }) {
        publishVote(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    }`,
    { id: createVote.id, token: process.env.GRAPHCMS_MUTATION_TOKEN }
  );

  res.status(201).json({ id: graphcms.createVote.id });
};
