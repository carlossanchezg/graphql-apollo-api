import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// eslint-disable-next-line max-len
const comparePasswords = (loggedPassword, registeredPassword) => bcrypt.compare(loggedPassword, registeredPassword);

const createToken = (user) => {
  const payload = {
    // eslint-disable-next-line no-underscore-dangle
    _id: user._id,
    email: user.email,
    first_name: user.first_name,
  };
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    return undefined;
  }
};

export { comparePasswords, createToken };
