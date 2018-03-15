import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql/type';
import { fromGlobalId } from 'graphql-relay';

import GetUser from './resolvers/GetUser';

import db from './db';
import { nodeField } from './nodeDefinitions';

import UserType from './types/UserType';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      User: {
        type: UserType,
        args: {
          id: {
            name: 'id',
            type: GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (root, { id }) => GetUser(db, { id: Number(fromGlobalId(id).id) }),
      },
      node: nodeField,
    },
  }),
});

export default schema;
