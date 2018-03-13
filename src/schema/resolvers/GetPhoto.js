import Photo from '../../data/Photo';

const GetPhoto = (db, { id }) => {
  const photo = db.get('photos').find({ id }).value();

  if (!photo) {
    throw new Error(`Unknown photo with id: ${id}`);
  }

  return new Photo(photo);
};

export default GetPhoto;
