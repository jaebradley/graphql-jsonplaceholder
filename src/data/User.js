import { Record } from 'immutable';
import Address from './Address';

import Company from './Company';

const defaults = {
  id: null,
  name: '',
  username: '',
  email: '',
  address: new Address(),
  phone: '',
  website: '',
  company: new Company(),
};

class User extends Record(defaults) {}

export default User;
