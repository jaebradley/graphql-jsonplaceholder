import { connectionDefinitions } from 'graphql-relay';

import PhotoAlbumType from '../types/PhotoAlbumType';

const {
  connectionType: PhotoAlbumsConnection,
} = connectionDefinitions({
  name: 'PhotoAlbum',
  nodeType: PhotoAlbumType,
});

export default PhotoAlbumsConnection;
