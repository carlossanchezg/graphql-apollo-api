/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { UserListsSchema } from './UserLists';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  user_list: [UserListsSchema],
  is_active: {
    type: Boolean,
    default: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  img_profile: {
    type: String,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  // eslint-disable-next-line consistent-return
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (errHash, hash) => {
      if (errHash) return next(errHash);

      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
  return false;
});

UserSchema.pre('save', function (next) {
  const user = this;
  const imgprofile = ['https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png', 'https://i.pinimg.com/originals/34/62/d2/3462d27440aa255b1c314ff16f4032b4.png', 'https://i.pinimg.com/originals/0d/6a/b2/0d6ab257cdc929ca129ba5557b125a68.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9fa8a33850498.56ba69ac2cc3a.png', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png', 'https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg', 'https://ih0.redbubble.net/image.618385909.1713/flat,1000x1000,075,f.u2.jpg', 'https://ih1.redbubble.net/image.618405117.2432/flat,1000x1000,075,f.u2.jpg', 'https://ih0.redbubble.net/image.618410871.2644/flat,800x800,075,f.u2.jpg', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/363e3e33850498.56ba69ac3183c.png'];
  const randomImgprofile = imgprofile[Math.floor(Math.random() * imgprofile.length)];

  user.img_profile = randomImgprofile;
  return next();
});

const User = model('User', UserSchema);

export default User;
