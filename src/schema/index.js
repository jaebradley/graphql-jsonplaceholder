import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql/type';
import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
} from 'graphql-relay';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

import GetUser from './resolvers/GetUser';
import GetTodo from './resolvers/GetTodo';
import GetTodos from './resolvers/GetTodos';
import GetPhotoAlbum from './resolvers/GetPhotoAlbum';
import GetPhotoAlbums from './resolvers/GetPhotoAlbums';
import GetPhoto from './resolvers/GetPhoto';
import GetPhotos from './resolvers/GetPhotos';
import GetPost from './resolvers/GetPost';
import GetPosts from './resolvers/GetPosts';
import GetComment from './resolvers/GetComment';
import GetComments from './resolvers/GetComments';

import User from '../data/User';
import Todo from '../data/Todo';
import PhotoAlbum from '../data/PhotoAlbum';
import Photo from '../data/Photo';
import Post from '../data/Post';
import Comment from '../data/Comment';

const db = lowdb(new FileSync(path.resolve(__dirname, '../data.json')));

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
      return UserType; // eslint-disable-line no-use-before-define
    }

    if (obj instanceof Todo) {
      return TodoType; // eslint-disable-line no-use-before-define
    }

    if (obj instanceof PhotoAlbum) {
      return PhotoAlbumType; // eslint-disable-line no-use-before-define
    }

    if (obj instanceof Photo) {
      return PhotoType; // eslint-disable-line no-use-before-define
    }

    if (obj instanceof Post) {
      return PostType; // eslint-disable-line no-use-before-define
    }

    if (obj instanceof Comment) {
      return CommentType; // eslint-disable-line no-use-before-define
    }

    return null;
  },
);

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  definition: 'A thing to do later, maybe',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Todo'),
    title: {
      type: GraphQLString,
      description: 'Title of todo item',
    },
    completed: {
      type: GraphQLBoolean,
      description: 'Whether or not the todo item has been completed',
    },
  },
});

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  definition: 'A picture graph',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Photo'),
    title: {
      type: GraphQLString,
      description: 'Title of photo',
    },
    url: {
      type: GraphQLString,
      description: 'URL for photo',
    },
    thumbnailUrl: {
      type: GraphQLString,
      description: 'URL for thumbnail',
    },
  },
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  definition: 'A Post Comment',
  interfaces: [nodeInterface],
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

const {
  connectionType: PhotosConnection,
} = connectionDefinitions({
  name: 'Photo',
  nodeType: PhotoType,
});

const {
  connectionType: CommentsConnection,
} = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});

const PhotoAlbumType = new GraphQLObjectType({
  name: 'PhotoAlbum',
  definition: 'A photo album',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('PhotoAlbum'),
    title: {
      type: GraphQLString,
      description: 'Title of photo album',
    },
    photos: {
      type: PhotosConnection,
      description: 'Photos that comprise album',
      args: connectionArgs,
      resolve: (album, args) => connectionFromArray(GetPhotos(db, { albumId: album.id }), args),
    },
  },
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  definition: 'A post',
  interfaces: [nodeInterface],
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

const {
  connectionType: TodosConnection,
} = connectionDefinitions({
  name: 'Todo',
  nodeType: TodoType,
});

const {
  connectionType: AlbumsConnection,
} = connectionDefinitions({
  name: 'PhotoAlbum',
  nodeType: PhotoAlbumType,
});

const {
  connectionType: PostsConnection,
} = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  interfaces: [nodeInterface],
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
    albums: {
      type: AlbumsConnection,
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

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      User: {
        type: UserType,
        args: {
          id: {
            name: 'id',
            type: GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (root, { id }) => GetUser(db, { id: Number(fromGlobalId(id).id) }),
      },
      node: nodeField,
    },
  }),
});

export default schema;
