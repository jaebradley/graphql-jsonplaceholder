import { Record } from 'immutable';

const defaults = {
  id: 0,
  title: '',
};

class PhotoAlbum extends Record(defaults) {}

export default PhotoAlbum;
