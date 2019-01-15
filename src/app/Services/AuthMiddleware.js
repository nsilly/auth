import { AsyncMiddleware } from '@nsilly/support';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Auth } from './Facades/Auth';
import { Exception } from '@nsilly/exceptions';

export const AuthMiddleware = AsyncMiddleware(async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Exception('Token not found', 1000);
    }
    const access_token = authorization.split(' ')[1];

    if (_.isNil(access_token)) {
      throw new Exception('Token not found', 1000);
    }

    const decoded = await jwt.verify(access_token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Exception('Token invalid', 4002);
    }

    await Auth.login(decoded.data);

    next();
  } catch (e) {
    throw new Exception(e.message, e.code);
  }
});
