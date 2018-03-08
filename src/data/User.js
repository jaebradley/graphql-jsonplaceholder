import { Record } from 'immutable';

const defaults = {
  id: null,
  name: '',
  username: '',
  email: '',
};

class User extends Record(defaults) {}

export default User;
