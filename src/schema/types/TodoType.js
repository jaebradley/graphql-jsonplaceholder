import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql/type';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../nodeDefinitions';


const TodoType = new GraphQLObjectType({
  name: 'Todo',
  definition: 'A thing to do later, maybe',
  interfaces: () => [nodeInterface],
  fields: {
    id: globalIdField('Todo'),
    title: {
      type: GraphQLString,
      description: 'Title of todo item',
    },
    completed: {
      type: GraphQLBoolean,
      description: 'Whether or not the todo item has been completed',
    },
  },
});

export default TodoType;
