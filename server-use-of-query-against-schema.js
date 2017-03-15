//http://stackoverflow.com/questions/39436322/node-js-syntaxerror-unexpected-token-import

//While import is indeed part of ES6, it is unfortunately not yet supported by any native environments, Node or browser
//Until support shows up natively, you'll have to continue using classic require statements:
//
//const express = require("express");
//If you really want to use new ES6/7 features in NodeJS, you can compile it using Babel.
//import {
//  graphql,
//  GraphQLSchema,
//  GraphQLObjectType,
//  GraphQLString
//} from 'graphql';

var { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql", "GraphQLSchema", "GraphQLObjectType","GraphQLString"); 

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
    	authorName: {
        type: GraphQLString,
        resolve() {
          return 'Manoj Krishnamurthy';
        }
      }
    }
  })
});

var query = '{ authorName }';

graphql(schema, query).then(result => {

  // Prints
//	{ data: { authorName: 'Manoj Krishnamurthy' } }
	
  console.log(result);

});