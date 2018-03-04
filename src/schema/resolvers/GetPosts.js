const GetPosts = (db, { userId }) => {
  const filters = userId ? { userId } : {};

  return db
    .get('posts')
    .filter(filters)
    .value()
    .map(post => ({
      id: post.id,
      title: post.title,
      body: post.body,
      user: db.get('users').find({ id: post.userId }).value(),
    }));
};

export default GetPosts;
