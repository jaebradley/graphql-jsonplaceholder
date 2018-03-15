import { connectionDefinitions } from 'graphql-relay';

import PhotoAlbumType from '../types/PhotoAlbumType';

const {
  connectionType: AlbumsConnection,
} = connectionDefinitions({
  name: 'PhotoAlbum',
  nodeType: PhotoAlbumType,
});

export default AlbumsConnection;
