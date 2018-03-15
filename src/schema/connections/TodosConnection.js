import { connectionDefinitions } from 'graphql-relay';

import TodoType from '../types/TodoType';

const {
  connectionType: TodosConnection,
} = connectionDefinitions({
  name: 'Todo',
  nodeType: TodoType,
});

export default TodosConnection;
