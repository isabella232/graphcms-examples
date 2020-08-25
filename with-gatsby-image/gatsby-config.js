module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GraphCMS`,
        fieldName: `gcms`,
        url: `https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6`,
      },
    },
    `gatsby-transformer-sharp`,
  ],
};
