
// To access and process a parameter sent as an argument in the request.

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RqstParamExample {
    Id: Int!
    getParameterPassedInRqst: Int!
    processParamInRqst(param: Int!): Int!
  }

  type Query {
    getId(Id: Int): RqstParamExample
  }
`);

// This class implements the RqstParamExample GraphQL type
class RqstParamExample {
  constructor(Id) {
    this.Id = Id;
  }

  getParameterPassedInRqst() {
    return this.Id;  // can access the Id here
  }

  processParamInRqst({param}) {
    // do something with param -- param passed in thru rqst
	  var output = param + param ;
    return output;
  }
}

// The root provides the top-level API endpoints
var root = {
  getId: function ({Id}) {
    return new RqstParamExample(Id);
  }
}

var app = express();
app.use('/rqstparamexample', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/rqstparamexample');


//http://localhost:4000/rqstparamexample

/*Request
 * {
	  getId(Id: 10) {
	    getParameterPassedInRqst
	    processParamInRqst(param:10)
	  }
	}
*/

/*
 * Response
{
  "data": {
    "getId": {
      "getParameterPassedInRqst": 10,
      "processParamInRqst": 20
    }
  }
}

 */
