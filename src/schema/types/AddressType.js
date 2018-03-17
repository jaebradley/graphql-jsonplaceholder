import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';

import CoordinateType from './CoordinateType';

const Address = new GraphQLObjectType({
  name: 'Address',
  description: 'Address Item',
  fields: () => ({
    street: {
      type: (GraphQLString),
      description: 'street name',
    },
    suite: {
      type: (GraphQLString),
      description: 'additional street address classification',
    },
    city: {
      type: (GraphQLString),
      description: 'city name',
    },
    zipcode: {
      type: (GraphQLString),
      description: 'zip code value',
    },
    coordinate: {
      type: (CoordinateType),
      description: 'coordinate',
    },
  }),
});

export default Address;
