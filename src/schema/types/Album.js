import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql/type';

import User from './User';

const Album = new GraphQLObjectType({
  name: 'Album',
  description: 'Album',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'id of album',
    },
    user: {
      type: User,
      description: 'album user',
    },
    title: {
      type: GraphQLString,
      description: 'title of album',
    },
  }),
});

export default Album;
