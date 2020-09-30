import userActions from './userActions';
import { createToken, comparePasswords } from '../../utils';

export default {
  register: async (body) => {
    const userExist = await userActions.getUserByEmail(body.email);
    if (userExist) throw new Error('Usuario existente inicia sesión');

    const newUser = await userActions.createUser(body);

    const token = createToken(newUser);
    if (!token) throw new Error('token error');

    return {
      user: newUser,
      token,
    };
  },
  login: async (body) => {
    const userExist = await userActions.getUserByEmail(body.email);
    if (!userExist) throw new Error('Usuario no existenge registrate primero');

    const comparedPasswords = await comparePasswords(body.password, userExist.password);
    if (!comparedPasswords) throw new Error('contraseña incorrecta');

    const token = createToken(userExist);
    if (!token) throw new Error('token error');

    return {
      user: userExist,
      token,
    };
  },
};
