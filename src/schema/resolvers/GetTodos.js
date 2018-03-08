import Todo from '../../data/Todo';

const GetTodos = (db, { userId }) => db.get('todos').filter({ userId }).value().map(todo => new Todo(todo));

export default GetTodos;
