import User from '../../data/User';

const GetUser = (db, { id }) => {
  const user = db.get('users').find({ id }).value();

  if (!user) {
    throw new Error(`Unknown user with id: ${id}`);
  }

  const {
    name,
    username,
    email,
  } = user;

  return new User({
    id: user.id,
    name,
    username,
    email,
  });
};

export default GetUser;
