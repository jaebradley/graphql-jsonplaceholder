import { Record } from 'immutable';

const defaults = {
  id: null,
  postId: null,
  name: '',
  email: '',
  body: '',
};

class Comment extends Record(defaults) {}

export default Comment;
