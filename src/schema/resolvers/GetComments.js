import GetPost from './GetPost';

const GetComments = (db, { postId, emailAddress }) => {
  const filters = {};

  if (postId) {
    filters.postId = postId;
  }

  if (emailAddress) {
    filters.email = emailAddress;
  }

  return db
    .get('comments')
    .filter(filters)
    .value()
    .map(comment => (
      {
        id: comment.id,
        name: comment.name,
        email: comment.email,
        body: comment.body,
        post: GetPost(db, { id: comment.postId }),
      }
    ));
};

export default GetComments;
