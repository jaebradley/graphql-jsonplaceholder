import Comment from '../../data/Comment';

const GetComment = (db, { id }) => {
  const comment = db.get('comments').find({ id }).value();
  if (!comment) {
    throw new Error(`Unknown comment with id: ${id}`);
  }

  return new Comment(comment);
};

export default GetComment;
