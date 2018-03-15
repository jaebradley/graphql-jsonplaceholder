import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import GetUser from './resolvers/GetUser';
import GetTodo from './resolvers/GetTodo';
import GetPhotoAlbum from './resolvers/GetPhotoAlbum';
import GetPhoto from './resolvers/GetPhoto';
import GetPost from './resolvers/GetPost';
import GetComment from './resolvers/GetComment';

import User from '../data/User';
import Todo from '../data/Todo';
import PhotoAlbum from '../data/PhotoAlbum';
import Photo from '../data/Photo';
import Post from '../data/Post';
import Comment from '../data/Comment';
import db from './db';

import TodoType from './types/TodoType';
import UserType from './types/UserType';
import PhotoAlbumType from './types/PhotoAlbumType';
import PhotoType from './types/PhotoType';
import PostType from './types/PostType';
import CommentType from './types/CommentType';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'User') {
      return GetUser(db, { id });
    }

    if (type === 'Todo') {
      return GetTodo(db, { id });
    }

    if (type === 'PhotoAlbum') {
      return GetPhotoAlbum(db, { id });
    }

    if (type === 'Photo') {
      return GetPhoto(db, { id });
    }

    if (type === 'Posts') {
      return GetPost(db, { id });
    }

    if (type === 'Comment') {
      return GetComment(db, { id });
    }

    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;
    }

    if (obj instanceof Todo) {
      return TodoType;
    }

    if (obj instanceof PhotoAlbum) {
      return PhotoAlbumType;
    }

    if (obj instanceof Photo) {
      return PhotoType;
    }

    if (obj instanceof Post) {
      return PostType;
    }

    if (obj instanceof Comment) {
      return CommentType;
    }

    return null;
  },
);

export {
  nodeInterface,
  nodeField,
};
