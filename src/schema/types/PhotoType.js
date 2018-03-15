import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  definition: 'A picture graph',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('Photo'),
    title: {
      type: GraphQLString,
      description: 'Title of photo',
    },
    url: {
      type: GraphQLString,
      description: 'URL for photo',
    },
    thumbnailUrl: {
      type: GraphQLString,
      description: 'URL for thumbnail',
    },
  },
});

export default PhotoType;
