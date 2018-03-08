import { Record } from 'immutable';

const defaults = {
  id: null,
  userId: null,
  title: '',
  body: '',
};

class Post extends Record(defaults) {}

export default Post;
