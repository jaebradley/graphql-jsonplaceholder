import GetPost from './GetPost';

const GetComment = (db, { id }) => {
  const comment = db.get('comments').find({ id }).value();
  if (!comment) {
    throw new Error(`Unknown comment with id: ${id}`);
  }

  return {
    id: comment.id,
    name: comment.name,
    email: comment.email,
    body: comment.body,
    post: GetPost(db, { id: comment.postId }),
  };
};

export default GetComment;
