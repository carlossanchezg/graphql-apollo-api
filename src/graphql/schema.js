import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getMovies: [Movie]
    getMovieById(_id: ID!): Movie
    getMovieByTitle(title: String!): Movie
    getUsers: [User]
    getUserById(_id: ID!): User
    getUserByEmail(email: String!): User
  }

  type Mutation {
    addNewMovie(body: MovieInput!): Movie
    updateMovie(_id: ID!, body: MovieInput!): Movie
    deleteMovie(_id: ID!): Movie
    createUser(body: UserInput!): User
    updateUser(_id: ID!, body: UserInput!): User
    deleteUser(_id: ID!): User
    createAndListInUser(_id: ID!, body: UserListInput!): User
    updateUserList(userId: ID!, listId: ID!, body: UserListInput!): User
    deleteUserList(_id: ID!, listId: ID!): User
    addMovieInUserList(_id: ID!, listId: ID!, movie: ID!): User
    deleteMovieToUserList(_id: ID!, listId: ID!, movie: ID!): User
    signup(body: UserInput!): AuthRes
    login(body: UserInput!): AuthRes
  }

  type Movie {
    _id: ID
    title: String!
    gender: [String!]!
    synopsis: String!
    year: Int!
    cover: String!
    movie_free: Boolean!
    video_trailer: String!
    video_movie: String!
    nedflix_originals: Boolean!
    trending_movie: Boolean!
    large_cover: String!
  }

  type User {
    _id: ID
    first_name: String
    email: String!
    password: String!
    user_list: [UserLists]
    is_active: Boolean
    premium: Boolean
    img_profile: String
  }

  type UserLists {
    _id: ID
    name_list: String!
    list_content: [Movie]
  }

  type AuthRes {
    user: User
    token: String!
  }

  input MovieInput {
    _id: ID
    title: String!
    gender: [String!]!
    synopsis: String!
    year: Int!
    cover: String!
    movie_free: Boolean!
    video_trailer: String!
    video_movie: String!
    nedflix_originals: Boolean!
    trending_movie: Boolean!
    large_cover: String!
  }

  input UserInput {
    first_name: String
    email: String!
    password: String!
  }

  input UserListInput {
    _id: ID
    name_list: String
    list_content: ID
  }
`;
