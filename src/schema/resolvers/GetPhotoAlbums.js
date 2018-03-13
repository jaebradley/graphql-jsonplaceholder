import PhotoAlbum from '../../data/PhotoAlbum';

const GetPhotoAlbums = (db, { userId }) => db
  .get('albums')
  .filter({ userId })
  .value()
  .map(({ id, title }) => new PhotoAlbum({ id, title }));

export default GetPhotoAlbums;
