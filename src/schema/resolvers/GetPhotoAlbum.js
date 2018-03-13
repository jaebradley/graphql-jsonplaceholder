import PhotoAlbum from '../../data/PhotoAlbum';

const GetPhotoAlbum = (db, { id }) => {
  const album = db.get('albums').find({ id }).value();

  if (!album) {
    throw new Error(`Unknown album with id: ${id}`);
  }

  return new PhotoAlbum({
    id: album.id,
    title: album.title,
  });
};

export default GetPhotoAlbum;
