const GetPosts = (db, { postId, userId }) => {
  const filters = {};

  if (postId) {
    filters.id = postId;
  }

  if (userId) {
    filters.userId = userId;
  }

  const user = db.get('users').find({ id: userId }).value();

  if (!user) {
    throw new Error(`Unable to identify user with id: ${userId}`);
  }

  return db
    .get('posts')
    .filter(filters)
    .value()
    .map(post => ({
      id: post.id,
      title: post.title,
      body: post.body,
      user,
    }));
};

export default GetPosts;
