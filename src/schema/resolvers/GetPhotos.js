import GetAlbum from './GetAlbum';

const GetPhotos = (db, { albumId }) => {
  const filters = albumId ? { albumId } : {};

  return db
    .get('photos')
    .filter(filters)
    .value()
    .map(photo => ({
      id: photo.id,
      title: photo.title,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl,
      album: GetAlbum(db, { id: photo.albumId }),
    }));
};

export default GetPhotos;
