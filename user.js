
var { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql", "GraphQLSchema", "GraphQLObjectType","GraphQLString"); 
var express = require('express');
var graphqlHTTP = require('express-graphql');

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    
	name: 'user',
    description: 'Query the details of the user...',
    
    fields: () => ({

    	userName: {
            type: GraphQLString,
            resolve(){
          	  return "krish"
            },
          },
          
        firstName: {
          type: GraphQLString,
          resolve(){
        	  return "Manoj"
          },
        },
        
        lastName: {
          type: GraphQLString,
          resolve(){
        	  return "Krishnamurthy"
          },
        },
        
        email: {
            type: GraphQLString,
            resolve(){
            	return "manoj.krishnamurthy@gmail.com"
            }
          }
      })
  })
});

// can query userName, firstName, lastName, email here ..
var query = '{ firstName, lastName }';

graphql(schema, query).then(result => {
  console.log(result);
});


var app = express();
app.use('/user', graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/user');

/*
Sample Request:
{
  email
  firstName
  userName
}

Response :
{
	  "data": {
	    "email": "manoj.krishnamurthy@gmail.com",
	    "firstName": "Manoj",
	    "userName": "krish"
	  }
	}
*/



