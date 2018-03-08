import { Record } from 'immutable';

const defaults = {
  id: null,
  title: '',
  completed: false,
};

class Todo extends Record(defaults) {}

export default Todo;
