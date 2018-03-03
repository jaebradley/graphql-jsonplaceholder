const MutatePost = (db, { postId, userId, title, body }) => {
  const filters = {};

  if (postId) {
    filters.id = postId;
  }

  if (userId) {
    filters.userId = userId;
  }

  const post = db.get('posts').find(filters).value();

  if (post) {
    return {
      id: post.id,
      userId: post.userId,
      title: title || post.title,
      body: body || post.body,
    };
  }

  throw new Error(`Unable to identify post: ${postId}`);
};

export default MutatePost;
