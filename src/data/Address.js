import { Record } from 'immutable';
import Coordinate from './Coordinate';

const defaults = {
  street: '',
  suite: '',
  city: '',
  zipcode: '',
  coordinate: new Coordinate(),
};

class Address extends Record(defaults) {}

export default Address;
