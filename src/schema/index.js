import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql/type';
import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
} from 'graphql-relay';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

import GetUser from './resolvers/GetUser';
import GetTodo from './resolvers/GetTodo';
import GetTodos from './resolvers/GetTodos';
import User from '../data/User';
import Todo from '../data/Todo';

const db = lowdb(new FileSync(path.resolve(__dirname, '../data.json')));

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'User') {
      return GetUser(db, { id });
    }

    if (type === 'Todo') {
      return GetTodo(db, { id });
    }

    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType; // eslint-disable-line no-use-before-define
    }

    if (obj instanceof Todo) {
      return TodoType; // eslint-disable-line no-use-before-define
    }

    return null;
  },
);

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  definition: 'A thing to do later, maybe',
  interfaces: [nodeInterface],
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

const {
  connectionType: TodosConnection,
} = connectionDefinitions({
  name: 'Todo',
  nodeType: TodoType,
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'User name',
    },
    username: {
      type: GraphQLString,
      description: 'User username',
    },
    email: {
      type: GraphQLString,
      description: 'User email address',
    },
    todos: {
      type: TodosConnection,
      description: 'Todos for User',
      args: connectionArgs,
      resolve: (user, args) => connectionFromArray(GetTodos(db, { userId: user.id }), args),
    },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      User: {
        type: UserType,
        args: {
          id: {
            name: 'id',
            type: GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (root, { id }) => GetUser(db, { id: Number(fromGlobalId(id).id) }),
      },
      node: nodeField,
    },
  }),
});

export default schema;
