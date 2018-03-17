import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';
import {
  globalIdField,
  connectionFromArray,
  connectionArgs,
} from 'graphql-relay';

import GetTodos from '../resolvers/GetTodos';
import GetPhotoAlbums from '../resolvers/GetPhotoAlbums';
import GetPosts from '../resolvers/GetPosts';

import PhotoAlbumsConnection from '../connections/PhotoAlbumsConnection';
import PostsConnection from '../connections/PostsConnection';
import TodosConnection from '../connections/TodosConnection';

import { nodeInterface } from '../nodeDefinitions';
import db from '../db';


const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'User name',
    },
    username: {
      type: GraphQLString,
      description: 'User username',
    },
    email: {
      type: GraphQLString,
      description: 'User email address',
    },
    todos: {
      type: TodosConnection,
      description: 'Todos for User',
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(GetTodos(db, { userId: user.id }), args),
    },
    photoAlbums: {
      type: PhotoAlbumsConnection,
      description: 'Photo Albums for user',
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(GetPhotoAlbums(db, { userId: user.id }), args),
    },
    posts: {
      type: PostsConnection,
      description: 'Posts for user',
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(GetPosts(db, { userId: user.id }), args),
    },
  },
});

export default UserType;
