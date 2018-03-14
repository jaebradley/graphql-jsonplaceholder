import Post from '../../data/Post';

const GetPosts = (db, { userId }) => db
  .get('posts')
  .filter({ userId })
  .value()
  .map(post => new Post(post));

export default GetPosts;
