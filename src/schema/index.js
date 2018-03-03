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
        resolve: (root, { postId, userId }) => {
          const filters = {};

          if (postId) {
            filters.id = postId;
          }

          if (userId) {
            filters.userId = userId;
          }

          const user = db.get('users').find({ id: userId }).value();

          if (!user) {
            throw new Error(`Unable to identify user with id: ${userId}`);
          }

          return db.get('posts').filter(filters).value().map(post => ({
            id: post.id,
            user,
            title: post.title,
            body: post.body,
          }));
        },
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
        resolve: (root, { postId, userId, title, body }) => {
          const filters = {};

          if (postId) {
            filters.id = postId;
          }

          if (userId) {
            filters.userId = userId;
          }

          const post = db.get('posts').find(filters).value();

          if (post) {
            return {
              id: post.id,
              userId: post.userId,
              title: title || post.title,
              body: body || post.body,
            };
          }

          throw new Error(`Unable to identify post: ${postId}`);
        },
      },
    },
  }),
});

export default schema;
