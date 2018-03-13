import Photo from '../../data/Photo';

const GetPhotos = (db, { albumId }) => db
  .get('photos')
  .filter({ albumId })
  .value()
  .map(photo => new Photo(photo));

export default GetPhotos;
