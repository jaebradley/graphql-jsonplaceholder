const GetAlbums = (db, { userId }) => {
  const filters = {};

  if (userId) {
    filters.userId = userId;
  }

  return db
    .get('albums')
    .filter(filters)
    .value()
    .map(album => ({
      id: album.id,
      title: album.title,
      user: db.get('users').find({ id: album.userId }).value(),
    }));
};

export default GetAlbums;
