const GetTodo = (db, { id }) => {
  const todo = db.get('todos').find({ id }).value();

  if (!todo) {
    throw new Error(`Unknown todo with id: ${id}`);
  }

  const {
    title,
    completed,
  } = todo;

  return {
    id: todo.id,
    title,
    completed,
  };
};

export default GetTodo;
