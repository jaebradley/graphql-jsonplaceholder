const GetAlbum = (db, { id }) => {
  const album = db.get('albums').find({ id }).value();

  if (!album) {
    throw new Error(`Unknown album with id: ${id}`);
  }

  const user = db.get('users').find({ id: album.userId }).value();
  return {
    id: album.id,
    title: album.title,
    user,
  };
};

export default GetAlbum;
