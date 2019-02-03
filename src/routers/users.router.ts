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