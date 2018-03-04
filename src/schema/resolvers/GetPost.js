const GetPost = (db, { id }) => {
  const post = db.get('posts').find({ id }).value();

  if (!post) {
    throw new Error(`Unknown post with id: ${id}`);
  }

  const user = db.get('users').find({ id: post.userId }).value();

  if (!user) {
    throw new Error(`Unknown user with id: ${post.userId}`);
  }

  return {
    id: post.id,
    title: post.title,
    body: post.body,
    user,
  };
};

export default GetPost;
