import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql/type';

import Album from './Album';

const Photo = new GraphQLObjectType({
  name: 'Photo',
  description: 'Photo',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'id',
    },
    album: {
      type: Album,
      description: 'photo album',
    },
    title: {
      type: GraphQLString,
      description: 'title',
    },
    url: {
      type: GraphQLString,
      description: 'url',
    },
    thumbnailUrl: {
      type: GraphQLString,
      description: 'thumbnail url',
    },
  }),
});

export default Photo;
