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

const db = lowdb(new FileSync(path.resolve(__dirname, './data.json')));

const PostType = new GraphQLObjectType({
  name: 'post',
  description: 'Post Item',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'id of the post',
    },
    userId: {
      type: (GraphQLInt),
      description: 'id of user that created the post',
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

          return db.get('posts').filter(filters).value();
        },
      },
    },
  }),
});

export default schema;
