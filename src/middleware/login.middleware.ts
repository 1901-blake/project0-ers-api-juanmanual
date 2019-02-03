import * as userDao from '../dao/dao.user';
import * as env from '../.env/config';
import jwt from 'jsonwebtoken';

export async function login(req: any, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const authPayload = await userDao.authenticate(username, password);

  if (authPayload) {
    const userPayload = authPayload;
    res.send(jwt.sign(userPayload, env.tokenSecret));
  } else {
    res.status(400).send('Invalid Credentials');
  }
}