import GetAlbum from './GetAlbum';

const GetPhoto = (db, { id }) => {
  const photo = db.get('photos').find({ id }).value();

  if (!photo) {
    throw new Error(`Unknown photo with id: ${id}`);
  }

  return {
    id: photo.id,
    title: photo.title,
    url: photo.url,
    thumbnailUrl: photo.thumbnailUrl,
    album: GetAlbum(db, { id: photo.albumId }),
  };
};

export default GetPhoto;
