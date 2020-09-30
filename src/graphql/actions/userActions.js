/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import User from '../../models/User';
import { UserLists } from '../../models/UserLists';

export default {
  getUsers: () => User.find().select('-password').populate({
    path: 'user_list',
    populate: {
      path: 'list_content',
    },
  }),
  getUserById: (_id) => User.findById(_id).select('-password').populate({
    path: 'user_list',
    populate: {
      path: 'list_content',
    },
  }),
  getUserByEmail: (email) => User.findOne({ email }).populate({
    path: 'user_list',
    populate: {
      path: 'list_content',
    },
  }),
  createUser: async (body) => {
    const newUser = new User(body);
    await newUser.save();
    newUser.password = undefined;
    return newUser;
  },
  updateUser: (_id, body) => User.findByIdAndUpdate(_id, body, { new: true }).select('-password').populate({
    path: 'user_list',
    populate: {
      path: 'list_content',
    },
  }),
  deleteUser: (_id) => User.findByIdAndDelete(_id),
  createList: (body) => {
    const newList = new UserLists(body);
    return newList;
  },
  addList: (user, list) => {
    user.user_list.push(list);
    return user.save();
  },
  findListById: (user, listId) => {
    const foundList = user.user_list.id(listId);
    return foundList;
  },
  updateList: (userId, listId, body) => {
    listId.name_list = body.name_list;
    return userId.save();
  },
  deleteList: (user, listId) => {
    const removeList = user.user_list.filter((list) => list._id !== listId._id);
    user.user_list = removeList;
    return user.save();
  },
  addMovieToList: (user, listId, movie) => {
    listId.list_content.push(movie);
    return user.save();
  },
  deleteMovieToList: (user, listId, movie) => {
    // eslint-disable-next-line eqeqeq
    const removeMovie = listId.list_content.filter((movies) => movies._id != movie);
    listId.list_content = removeMovie;
    return user.save();
  },
  // findUserAndListById: (userId, listId) => {
  // }
};
