// Keeping this here for posterity

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       posts: {
//         type: GraphQLList(PostType),
//         args: {
//           userId: {
//             name: 'userId',
//             type: GraphQLInt,
//           },
//         },
//         resolve: (root, { args }) => GetPosts(db, { args }),
//       },
//       user: {
//         type: UserType,
//         args: {
//           id: {
//             name: 'id',
//             type: GraphQLInt,
//           },
//         },
//         resolve: (root, { id }) => db.get('users').find({ id }).value(),
//       },
//       comment: {
//         type: CommentType,
//         args: {
//           id: {
//             name: 'id',
//             type: GraphQLInt,
//           },
//         },
//         resolve: (root, { id }) => GetComment(db, { id }),
//       },
//       comments: {
//         type: GraphQLList(CommentType),
//         args: {
//           postId: {
//             name: 'postId',
//             type: GraphQLInt,
//           },
//           emailAddress: {
//             name: 'emailAddress',
//             type: GraphQLString,
//           },
//         },
//         resolve: (root, { args }) => GetComments(db, { args }),
//       },
//       album: {
//         type: AlbumType,
//         args: {
//           id: {
//             name: 'id',
//             type: GraphQLNonNull(GraphQLInt),
//           },
//         },
//         resolve: (root, { id }) => GetAlbum(db, { id }),
//       },
//       albums: {
//         type: GraphQLList(AlbumType),
//         args: {
//           userId: {
//             name: 'userId',
//             type: GraphQLInt,
//           },
//         },
//         resolve: (root, { userId }) => GetAlbums(db, { userId }),
//       },
//       photo: {
//         type: PhotoType,
//         args: {
//           id: {
//             name: 'id',
//             type: GraphQLNonNull(GraphQLInt),
//           },
//         },
//         resolve: (root, { id }) => GetPhoto(db, { id }),
//       },
//       photos: {
//         type: GraphQLList(PhotoType),
//         args: {
//           albumId: {
//             name: 'albumId',
//             type: GraphQLInt,
//           },
//         },
//         resolve: (root, { albumId }) => GetPhotos(db, { albumId }),
//       },
//     },
//   }),
//   mutation: new GraphQLObjectType({
//     name: 'RootMutationType',
//     fields: {
//       updatePost: {
//         type: PostType,
//         args: {
//           id: {
//             name: 'id',
//             type: GraphQLNonNull(GraphQLInt),
//           },
//           userId: {
//             name: 'userId',
//             type: GraphQLInt,
//           },
//           title: {
//             name: 'title',
//             type: GraphQLString,
//           },
//           body: {
//             name: 'body',
//             type: GraphQLString,
//           },
//         },
//         resolve: (root, args) => MutatePost(db, args),
//       },
//       createPost: {
//         type: PostType,
//         args: {
//           userId: {
//             name: 'userId',
//             type: GraphQLNonNull(GraphQLInt),
//           },
//           title: {
//             name: 'title',
//             type: GraphQLString,
//           },
//           body: {
//             name: 'body',
//             type: GraphQLString,
//           },
//         },
//         resolve: (root, args) => CreatePost(db, args),
//       },
//       updateComment: {
//         type: CommentType,
//         args: {
//           id: {
//             name: 'id',
//             type: GraphQLNonNull(GraphQLInt),
//           },
//           postId: {
//             name: 'postId',
//             type: GraphQLInt,
//           },
//           name: {
//             name: 'name',
//             type: GraphQLString,
//           },
//           email: {
//             name: 'email',
//             type: GraphQLString,
//           },
//           body: {
//             name: 'body',
//             type: GraphQLString,
//           },
//         },
//         resolve: (root, args) => UpdateComment(db, args),
//       },
//     },
//   }),
// });
