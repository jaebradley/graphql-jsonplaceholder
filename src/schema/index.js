import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql/type';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

import PostType from './types/Post';
import UserType from './types/User';
import CommentType from './types/Comment';
import AlbumType from './types/Album';

import GetPosts from './resolvers/GetPosts';
import MutatePost from './resolvers/MutatePost';
import GetComment from './resolvers/GetComment';
import GetComments from './resolvers/GetComments';
import GetAlbum from './resolvers/GetAlbum';
import GetAlbums from './resolvers/GetAlbums';

const db = lowdb(new FileSync(path.resolve(__dirname, '../data.json')));

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      posts: {
        type: GraphQLList(PostType),
        args: {
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
      comment: {
        type: CommentType,
        args: {
          id: {
            name: 'id',
            type: GraphQLInt,
          },
        },
        resolve: (root, { id }) => GetComment(db, { id }),
      },
      comments: {
        type: GraphQLList(CommentType),
        args: {
          postId: {
            name: 'postId',
            type: GraphQLInt,
          },
          emailAddress: {
            name: 'emailAddress',
            type: GraphQLString,
          },
        },
        resolve: (root, { args }) => GetComments(db, { args }),
      },
      album: {
        type: AlbumType,
        args: {
          id: {
            name: 'id',
            type: GraphQLNonNull(GraphQLInt),
          },
        },
        resolve: (root, { id }) => GetAlbum(db, { id }),
      },
      albums: {
        type: GraphQLList(AlbumType),
        args: {
          userId: {
            name: 'userId',
            type: GraphQLInt,
          },
        },
        resolve: (root, { userId }) => GetAlbums(db, { userId }),
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
