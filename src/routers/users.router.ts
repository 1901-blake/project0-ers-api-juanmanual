import express from 'express';
import { auth } from '../middleware/auth.middleware';
import { unauthorizedHandler } from '../middleware/jwt-unauthorized-handler.middleware';

export const usersRouter = express.Router();

const PLACEHOLDER_OBJECT = {place: 'holder'};

usersRouter.get('/:id',
  auth,
  async function (req: any, res, next) {
    console.log(req.user.userid);
    console.log(req.params.id);
    if (req.user.role === 'admin'
        || req.user.role === 'finance'
        || parseInt(req.user.userid) === parseInt(req.params.id)) {
        res.status(200);
        res.json(PLACEHOLDER_OBJECT); // return ReimbursementsDao.getAll(): <json object>
    } else {
        res.status(401);
        res.send('Invalid Credentials');
    }
  }, unauthorizedHandler);


usersRouter.get('',
  auth,
  async function (req: any, res, next) {
    console.log(req.user.userid);
    console.log(req.params.id);
    if (req.user.role === 'admin' || req.user.role === 'finance') {
        res.status(200);
        res.json(PLACEHOLDER_OBJECT); // return ReimbursementsDao.getAll(): <json object>
    } else {
        res.status(401);
        res.send('Invalid Credentials');
    }
  }, unauthorizedHandler);