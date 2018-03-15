import { connectionDefinitions } from 'graphql-relay';

import PostType from '../types/PostType';

const {
  connectionType: PostsConnection,
} = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

export default PostsConnection;
