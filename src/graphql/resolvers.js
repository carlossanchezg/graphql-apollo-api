/* eslint-disable no-return-await */
import movieActions from './actions/movieActions';
import userActions from './actions/userActions';
import authActions from './actions/authActions';

export default {
  Query: {
    getMovies: async () => await movieActions.getMovies(),
    getMovieById: async (_, { _id }) => await movieActions.getMovieById(_id),
    getMovieByTitle: async (_, { title }) => await movieActions.getMovieByTitle(title),
    getUsers: async () => await userActions.getUsers(),
    getUserById: async (_, { _id }) => await userActions.getUserById(_id),
    getUserByEmail: async (_, { email }) => await userActions.getUserByEmail(email),
  },
  Mutation: {
    addNewMovie: async (_, { body }) => await movieActions.addNewMovie(body),
    updateMovie: async (_, { _id, body }) => await movieActions.updateMovie(_id, body),
    deleteMovie: async (_, { _id }) => await movieActions.deleteMovie(_id),
    createUser: async (_, { body }) => await userActions.createUser(body),
    updateUser: async (_, { _id, body }) => await userActions.updateUser(_id, body),
    deleteUser: async (_, { _id }) => await userActions.deleteUser(_id),
    createAndListInUser: async (_, { _id, body }) => {
      const user = await userActions.getUserById(_id);
      const list = await userActions.createList(body);
      const addList = await userActions.addList(user, list);
      return addList;
    },
    updateUserList: async (_, { userId, listId, body }) => {
      const user = await userActions.getUserById(userId);
      const foundList = await userActions.findListById(user, listId);
      const newList = await userActions.updateList(user, foundList, body);
      return newList;
    },
    deleteUserList: async (_, { _id, listId }) => {
      const user = await userActions.getUserById(_id);
      const foundList = await userActions.findListById(user, listId);
      const deletedList = await userActions.deleteList(user, foundList);
      return deletedList;
    },
    addMovieInUserList: async (_, { _id, listId, movie }) => {
      const user = await userActions.getUserById(_id);
      const foundList = await userActions.findListById(user, listId);
      const addMovie = await userActions.addMovieToList(user, foundList, movie);
      return addMovie;
    },
    deleteMovieToUserList: async (_, { _id, listId, movie }) => {
      const user = await userActions.getUserById(_id);
      const foundList = await userActions.findListById(user, listId);
      const deletedMovie = await userActions.deleteMovieToList(user, foundList, movie);
      return deletedMovie;
    },
    signup: async (_, { body }) => {
      const ok = await authActions.register(body);
      return ok;
    },
    login: async (_, { body }) => {
      const ok = await authActions.login(body);
      return ok;
    },
  },
};
