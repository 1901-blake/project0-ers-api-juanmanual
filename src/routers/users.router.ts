import express from 'express';
import { auth } from '../middleware/auth.middleware';
import { unauthorizedHandler } from '../middleware/jwt-unauthorized-handler.middleware';

import * as userDao from '../dao/dao.user';
import { User } from '../models/User.models';

export const usersRouter = express.Router();


usersRouter.get('/:id',
  auth,
  async function (req: any, res, next) {
    if (req.user.role === 'admin'
        || req.user.role === 'finance'
        || parseInt(req.user.userid) === parseInt(req.params.id)) {
          const result = await userDao.getById(req.params.id);
        if ( Object.keys(result).length !== 0) {
          res.status(200).json(result);
        } else {
          res.sendStatus(400);
        }
    } else {
        res.status(401);
        res.send('Invalid Credentials');
    }
  }, unauthorizedHandler);

usersRouter.patch('',
auth,
async function (req: any, res, next) {
  if (req.body.userId === undefined) {
    if(!req.user ){
      res.status(401).send('Invalid Credentials');
    } else if (req.user.role !== 'admin') {
      res.status(401).send('Invalid Credentials');
    } else res.sendStatus(400);
  } else if (req.user && req.user.role === 'admin') {
    const user = (new User)
      .setUserId(req.body.userId)
      .setFirstName(req.body.firstname)
      .setLastName(req.body.lastname)
      .setEmail(req.body.email);

    const results = await userDao.update(user);
    if (results && Object.keys(results).length > 0)
      res.status(200).json(results);

    else res.sendStatus(400);
  }  else {
    res.status(401).send('Invalid Credentials');
  }
  next();
}, unauthorizedHandler);


usersRouter.get('',
  auth,
  async function (req: any, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'finance') {
        res.status(200);
        const users = await userDao.getAll();
        res.json(users);
    } else {
        res.status(401);
        res.send('Invalid Credentials');
    }
  }, unauthorizedHandler);