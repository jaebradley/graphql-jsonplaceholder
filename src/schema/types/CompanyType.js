import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: 'Company',
  fields: () => ({
    name: {
      type: (GraphQLString),
      description: 'name',
    },
    catchPhrase: {
      type: (GraphQLString),
      description: 'catch phrase',
    },
    bullshit: {
      type: (GraphQLString),
      description: 'bull shiiiiet',
    },
  }),
});

export default CompanyType;