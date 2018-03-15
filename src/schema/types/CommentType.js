import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  definition: 'A Post Comment',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('Comment'),
    name: {
      type: GraphQLString,
      description: 'Name of comment',
    },
    email: {
      type: GraphQLString,
      description: 'Email address of commenter',
    },
    body: {
      type: GraphQLString,
      description: 'Comment body',
    },
  },
});

export default CommentType;
