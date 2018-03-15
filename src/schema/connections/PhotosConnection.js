import { connectionDefinitions } from 'graphql-relay';

import PhotoType from '../types/PhotoType';

const {
  connectionType: PhotosConnection,
} = connectionDefinitions({
  name: 'Photo',
  nodeType: PhotoType,
});

export default PhotosConnection;
