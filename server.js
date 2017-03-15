var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    graphqltest: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  graphqltest: () => {
    return 'This is a graphql test ....!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ graphqltest }', root).then((response) => {
  console.log(response);
});
