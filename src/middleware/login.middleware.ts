

import * as userDao from '../dao/dao.user';
import * as env from '../.env/config';
import jwt from 'jsonwebtoken';

export async function login(req: any, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const isLegit = await userDao.authenticate(username, password);

  if (isLegit) {
    jwt.sign(username, env.tokenSecret);
    next();
  }

  next();
}