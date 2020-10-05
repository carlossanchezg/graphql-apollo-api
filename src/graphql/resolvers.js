/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import movieActions from './actions/movieActions';
import userActions from './actions/userActions';
import authActions from './actions/authActions';
import { verifyToken } from '../middlewares';

export default {
  Query: {
    getMovies: async () => await movieActions.getMovies(),
    getMovieById: async (_, { _id }) => await movieActions.getMovieById(_id),
    getMovieByTitle: async (_, { title, token }) => {
      try {
        if (verifyToken(token)) return await movieActions.getMovieByTitle(title);
        return 'x';
        // throw new Error('Ocurrio un problema');
      } catch (error) {
        console.log('ERROR:'.red.bold, error);
        throw new Error('NO TIENES BOLETO TOKEN');
      }
    },
    getUsers: async () => await userActions.getUsers(),
    getUserById: async (_, { _id }) => await userActions.getUserById(_id),
    getUserByEmail: async (_, { email }) => await userActions.getUserByEmail(email),
  },
  Mutation: {
    addNewMovie: async (_, { body, token }) => {
      try {
        if (verifyToken(token)) return await movieActions.addNewMovie(body);
        return 'x';
        // throw new Error('Ocurrio un problema');
      } catch (error) {
        console.log('ERROR:'.red.bold, error);
        throw new Error('NO TIENES BOLETO TOKEN');
      }
    },
    updateMovie: async (_, { _id, body }) => await movieActions.updateMovie(_id, body),
    deleteMovie: async (_, { _id }) => await movieActions.deleteMovie(_id),
    createUser: async (_, { body }) => await userActions.createUser(body),
    updateUser: async (_, { _id, body }) => await userActions.updateUser(_id, body),
    deleteUser: async (_, { _id }) => await userActions.deleteUser(_id),
    createAndAddListInUser: async (_, { _id, body }) => {
      try {
        const user = await userActions.getUserById(_id);
        const list = await userActions.createList(body);
        const addList = await userActions.addList(user, list);
        return addList;
      } catch (error) {
        return error;
      }
    },
    updateUserList: async (_, { userId, listId, body }) => {
      try {
        const userAndList = await userActions.findUserAndListById(userId, listId);
        const newList = await userActions.updateList(userAndList[0], userAndList[1], body);
        return newList;
      } catch (error) {
        return error;
      }
    },
    deleteUserList: async (_, { _id, listId }) => {
      try {
        const userAndList = await userActions.findUserAndListById(_id, listId);
        const deletedList = await userActions.deleteList(userAndList[0], userAndList[1]);
        return deletedList;
      } catch (error) {
        return error;
      }
    },
    addMovieInUserList: async (_, { _id, listId, movie }) => {
      try {
        const userAndList = await userActions.findUserAndListById(_id, listId);
        const addMovie = await userActions.addMovieToList(userAndList[0], userAndList[1], movie);
        return addMovie;
      } catch (error) {
        return error;
      }
    },
    deleteMovieToUserList: async (_, { _id, listId, movie }) => {
      try {
        const userAndList = await userActions.findUserAndListById(_id, listId);
        const deletedMovie = await userActions.deleteMovieToList(userAndList[0], userAndList[1], movie);
        return deletedMovie;
      } catch (error) {
        return error;
      }
    },
    signup: async (_, { body }) => {
      try {
        const ok = await authActions.register(body);
        return ok;
      } catch (error) {
        return error;
      }
    },
    login: async (_, { body }) => {
      try {
        const ok = await authActions.login(body);
        return ok;
      } catch (error) {
        return error;
      }
    },
  },
};
