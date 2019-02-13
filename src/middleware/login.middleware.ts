import * as userDao from '../dao/dao.user';
import * as env from '../.env/config';
import jwt from 'jsonwebtoken';

export async function login(req: any, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const authPayload = await userDao.authenticate(username, password);

  if (authPayload) {
    const userPayload = authPayload;
    const id = userPayload.userid;
    const token = jwt.sign(userPayload, env.tokenSecret);
    const user = await userDao.getById(id);

    res.send({token: token, user: user});
  } else {
    res.status(400).send('Invalid Credentials');
  }
}