import { Record } from 'immutable';

const defaults = {
  name: '',
  catchPhrase: '',
  bullshit: '',
};

class Company extends Record(defaults) {}

export default Company;
