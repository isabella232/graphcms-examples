// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-graphql',
      options: {
        url:
          'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6',
        fieldName: 'gcms',
        typeName: 'gcmsTypes',
      },
    },
  ],
};
