const GetPost = (db, { id }) => {
  const post = db.get('posts').find({ id }).value();

  if (!post) {
    throw new Error(`Unknown post with id: ${id}`);
  }

  return {
    id: post.id,
    title: post.title,
    body: post.body,
  };
};

export default GetPost;
