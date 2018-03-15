import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';
import {
  globalIdField,
  connectionFromArray,
  connectionArgs,
} from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';
import PhotosConnection from '../connections/PhotosConnection';
import GetPhotos from '../resolvers/GetPhotos';
import db from '../db';

const PhotoAlbumType = new GraphQLObjectType({
  name: 'PhotoAlbum',
  definition: 'A photo album',
  interfaces: () => [nodeInterface],
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

export default PhotoAlbumType;
