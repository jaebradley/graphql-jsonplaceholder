import Comment from '../../data/Comment';

const GetComments = (db, { postId }) => db
  .get('comments')
  .filter({ postId })
  .value()
  .map(comment => new Comment(comment));

export default GetComments;
