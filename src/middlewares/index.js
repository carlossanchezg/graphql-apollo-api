/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);

  if (_id) return true;
  return 'x';
  // throw new Error('Ocurrio un problema');
};

export { verifyToken };
