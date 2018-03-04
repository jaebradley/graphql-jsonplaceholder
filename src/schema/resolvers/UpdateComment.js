const UpdateComment = (db, { id, postId, name, email, body }) => {
  const comment = db.get('comments').find({ id }).value();

  if (!comment) {
    throw new Error(`Unknown comment with id: ${id}`);
  }

  const post = db.get('posts').find({ id: postId || comment.postId }).value();

  if (!post) {
    throw new Error(`Unknown post with id: ${postId}`);
  }

  return {
    id,
    name: name || comment.name,
    email: email || comment.email,
    body: body || comment.body,
    post,
  };
};

export default UpdateComment;
