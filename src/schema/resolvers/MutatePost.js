const MutatePost = (db, {
  id, userId, title, body,
}) => {
  const filters = {};

  if (id) {
    filters.id = id;
  }

  if (userId) {
    filters.userId = userId;
  }

  const post = db.get('posts').find(filters).value();

  if (post) {
    return {
      id: post.id,
      user: db.get('users').find({ id: post.userId }).value(),
      title: title || post.title,
      body: body || post.body,
    };
  }

  throw new Error(`Unable to identify post with id: ${id}`);
};

export default MutatePost;
