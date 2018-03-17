import { Record } from 'immutable';

const defaults = {
  latitude: 0,
  longitude: 0,
};

class Coordinate extends Record(defaults) {}

export default Coordinate;
