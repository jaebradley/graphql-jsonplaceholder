import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} from 'graphql/type';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

import PostType from './types/Post';
import UserType from './types/User';
import GetPosts from './resolvers/GetPosts';
import MutatePost from './resolvers/MutatePost';

const db = lowdb(new FileSync(path.resolve(__dirname, '../data.json')));

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      posts: {
        type: GraphQLList(PostType),
        args: {
          postId: {
            name: 'postId',
            type: GraphQLInt,
          },
          userId: {
            name: 'userId',
            type: GraphQLInt,
          },
        },
        resolve: (root, { args }) => GetPosts(db, { args }),
      },
      user: {
        type: UserType,
        args: {
          id: {
            name: 'id',
            type: GraphQLInt,
          },
        },
        resolve: (root, { id }) => db.get('users').find({ id }).value(),
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      post: {
        type: PostType,
        args: {
          postId: {
            name: 'postId',
            type: GraphQLInt,
          },
          userId: {
            name: 'userId',
            type: GraphQLInt,
          },
          title: {
            name: 'title',
            type: GraphQLString,
          },
          body: {
            name: 'body',
            type: GraphQLString,
          },
        },
        resolve: (root, { args }) => MutatePost(db, { args }),
      },
    },
  }),
});

export default schema;
