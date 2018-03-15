import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';
import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';

import CommentsConnection from '../connections/CommentsConnection';
import GetComments from '../resolvers/GetComments';
import { nodeInterface } from '../nodeDefinitions';
import db from '../db';

const PostType = new GraphQLObjectType({
  name: 'Post',
  definition: 'A post',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('Post'),
    title: {
      type: GraphQLString,
      description: 'Title of post',
    },
    body: {
      type: GraphQLString,
      description: 'Body of post',
    },
    comments: {
      type: CommentsConnection,
      description: 'Comments associated with post',
      args: connectionArgs,
      resolve: (post, args) => connectionFromArray(GetComments(db, { postId: post.id }), args),
    },
  },
});

export default PostType;
