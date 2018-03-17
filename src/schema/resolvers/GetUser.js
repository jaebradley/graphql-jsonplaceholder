import User from '../../data/User';
import Address from '../../data/Address';
import Coordinate from '../../data/Coordinate';
import Company from '../../data/Company';

const GetUser = (db, { id }) => {
  const user = db.get('users').find({ id }).value();

  if (!user) {
    throw new Error(`Unknown user with id: ${id}`);
  }

  const {
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  } = user;

  const {
    street,
    suite,
    city,
    zipcode,
    coordinate,
  } = address;

  return new User({
    id: user.id,
    name,
    username,
    email,
    phone,
    website,
    address: new Address({
      street,
      suite,
      city,
      zipcode,
      coordinate: new Coordinate(coordinate),
    }),
    company: new Company(company),
  });
};

export default GetUser;
