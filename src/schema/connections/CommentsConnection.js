import { connectionDefinitions } from 'graphql-relay';
import CommentType from '../types/CommentType';

const {
  connectionType: CommentsConnection,
} = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});

export default CommentsConnection;
