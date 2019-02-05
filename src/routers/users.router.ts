import express from 'express';
import { auth } from '../middleware/auth.middleware';
import { unauthorizedHandler } from '../middleware/jwt-unauthorized-handler.middleware';

import * as userDao from '../dao/dao.user';

export const usersRouter = express.Router();


usersRouter.get('/:id',
  auth,
  async function (req: any, res, next) {
    if (req.user.role === 'admin'
        || req.user.role === 'finance'
        || parseInt(req.user.userid) === parseInt(req.params.id)) {
        res.status(200);
        res.json(userDao.getById(req.params.id));
    } else {
        res.status(401);
        res.send('Invalid Credentials');
    }
  }, unauthorizedHandler);

usersRouter.patch('',
auth,
async function (req: any, res, next) {
  if (req.body.userid === undefined) {
    res.sendStatus(400);
  } else if (req.user && req.user.role === 'admin') {
    res.status(200).json({place: 'holder'});
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