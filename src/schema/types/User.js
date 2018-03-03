import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql/type';

import Address from './Address';
import Company from './Company';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User Item',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'id of user',
    },
    name: {
      type: (GraphQLString),
      description: 'name of user',
    },
    username: {
      type: (GraphQLString),
      description: 'username of user',
    },
    email: {
      type: (GraphQLString),
      description: 'email of user',
    },
    address: {
      type: (Address),
      description: 'address of user',
    },
    phone: {
      type: (GraphQLString),
      description: 'phone number of user',
    },
    website: {
      type: (GraphQLString),
      description: 'web site of user',
    },
    company: {
      type: (Company),
      description: 'company',
    },
  }),
});

export default User;
