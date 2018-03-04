const CreatePost = (db, { userId, title, body }) => {
  const user = db.get('users').find({ id: userId }).value();

  if (!user) {
    throw new Error(`Unknown user with id: ${userId}`);
  }

  return {
    id: 100 + (Math.round(10000 * Math.random())),
    title: title || '',
    body: body || '',
    user,
  };
};

export default CreatePost;
