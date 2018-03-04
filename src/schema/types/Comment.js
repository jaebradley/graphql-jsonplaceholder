import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql/type';

import Post from './Post';

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'id of comment',
    },
    post: {
      type: Post,
      description: 'Post',
    },
    name: {
      type: GraphQLString,
      description: 'Name',
    },
    email: {
      type: GraphQLString,
      description: 'Email of Commenter',
    },
    body: {
      type: GraphQLString,
      description: 'Body of Comment',
    },
  }),
});

export default Comment;
