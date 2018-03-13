import { Record } from 'immutable';

const defaults = {
  id: 0,
  title: '',
  url: '',
  thumbnailUrl: '',
};

class Photo extends Record(defaults) {}

export default Photo;
