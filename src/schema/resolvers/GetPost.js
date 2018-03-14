import Post from '../../data/Post';

const GetPost = (db, { id }) => {
  const post = db.get('posts').find({ id }).value();

  if (!post) {
    throw new Error(`Unknown post with id: ${id}`);
  }

  return new Post(post);
};

export default GetPost;
