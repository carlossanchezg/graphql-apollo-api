import { Schema, model } from 'mongoose';

const UserListsSchema = new Schema({
  name_list: {
    type: String,
  },
  list_content: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }],
});

const UserLists = model('UserLists', UserListsSchema);

export { UserLists, UserListsSchema };
