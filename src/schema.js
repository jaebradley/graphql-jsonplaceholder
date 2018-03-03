import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql/type';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

const db = lowdb(new FileSync(path.resolve(__dirname, './data.json')));

const CoordinateType = new GraphQLObjectType({
  name: 'Coordinate',
  description: 'Geographical Coordinate',
  fields: () => ({
    latitude: {
      type: (GraphQLFloat),
      description: 'latitude',
    },
    longitude: {
      type: (GraphQLFloat),
      description: 'longitude',
    },
  }),
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: 'Company',
  fields: () => ({
    name: {
      type: (GraphQLString),
      description: 'name',
    },
    catchPhrase: {
      type: (GraphQLString),
      description: 'catch phrase',
    },
    bullshit: {
      type: (GraphQLString),
      description: 'bull shiiiiet',
    },
  }),
});

const AddressType = new GraphQLObjectType({
  name: 'Address',
  description: 'Address Item',
  fields: () => ({
    street: {
      type: (GraphQLString),
      description: 'street name',
    },
    suite: {
      type: (GraphQLString),
      description: 'additional street address classification',
    },
    city: {
      type: (GraphQLString),
      description: 'city name',
    },
    zipcode: {
      type: (GraphQLString),
      description: 'zip code value',
    },
    coordinate: {
      type: (CoordinateType),
      description: 'coordinate',
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Item',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'id of user',
    },
    name: {
      type: (GraphQLString),
      description: 'name of user',
    },
    username: {
      type: (GraphQLString),
      description: 'username of user',
    },
    email: {
      type: (GraphQLString),
      description: 'email of user',
    },
    address: {
      type: (AddressType),
      description: 'address of user',
    },
    phone: {
      type: (GraphQLString),
      description: 'phone number of user',
    },
    website: {
      type: (GraphQLString),
      description: 'web site of user',
    },
    company: {
      type: (CompanyType),
      description: 'company',
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'post',
  description: 'Post Item',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'id of the post',
    },
    user: {
      type: (UserType),
      description: 'user that created the post',
    },
    title: {
      type: (GraphQLString),
      description: 'title for post',
    },
    body: {
      type: (GraphQLString),
      description: 'body for post',
    },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      posts: {
        type: GraphQLList(PostType),
        args: {
          postId: {
            name: 'postId',
            type: GraphQLInt,
          },
          userId: {
            name: 'userId',
            type: GraphQLInt,
          },
        },
        resolve: (root, { postId, userId }) => {
          const filters = {};

          if (postId) {
            filters.id = postId;
          }

          if (userId) {
            filters.userId = userId;
          }

          const user = db.get('users').find({ id: userId }).value();

          if (!user) {
            throw new Error(`Unable to identify user with id: ${userId}`);
          }

          return db.get('posts').filter(filters).value().map(post => ({
            id: post.id,
            user,
            title: post.title,
            body: post.body,
          }));
        },
      },
      user: {
        type: UserType,
        args: {
          id: {
            name: 'id',
            type: GraphQLInt,
          },
        },
        resolve: (root, { id }) => db.get('users').find({ id }).value(),
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      post: {
        type: PostType,
        args: {
          postId: {
            name: 'postId',
            type: GraphQLInt,
          },
          userId: {
            name: 'userId',
            type: GraphQLInt,
          },
          title: {
            name: 'title',
            type: GraphQLString,
          },
          body: {
            name: 'body',
            type: GraphQLString,
          },
        },
        resolve: (root, { postId, userId, title, body }) => {
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
        },
      },
    },
  }),
});

export default schema;
