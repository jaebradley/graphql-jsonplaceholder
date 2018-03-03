import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql/type';

import User from './User';

const Post = new GraphQLObjectType({
  name: 'post',
  description: 'Post Item',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'id of the post',
    },
    user: {
      type: (User),
      description: 'user that created the post',
    },
    title: {
      type: (GraphQLString),
      description: 'title for post',
    },
    body: {
      type: (GraphQLString),
      description: 'body for post',
    },
  }),
});

export default Post;
