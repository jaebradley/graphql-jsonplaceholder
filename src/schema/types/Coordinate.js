import {
  GraphQLObjectType,
  GraphQLFloat,
} from 'graphql/type';

const Coordinate = new GraphQLObjectType({
  name: 'Coordinate',
  description: 'Geographical Coordinate',
  fields: () => ({
    latitude: {
      type: (GraphQLFloat),
      description: 'latitude',
    },
    longitude: {
      type: (GraphQLFloat),
      description: 'longitude',
    },
  }),
});

export default Coordinate;
