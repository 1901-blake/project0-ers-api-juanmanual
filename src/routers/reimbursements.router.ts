import express from 'express';
import { auth } from '../middleware/auth.middleware';
import { unauthorizedHandler } from '../middleware/jwt-unauthorized-handler.middleware';

export const reimbursementsRouter = express.Router();

const PLACEHOLDER_OBJECT = {place: 'holder'};


// GET url/reimbursements
reimbursementsRouter.get('/status/:id',
  auth,
  async function (req: any, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'finance') {
        res.status(200);
        res.json(PLACEHOLDER_OBJECT); // return ReimbursementsDao.getAll(): <json object>
    } else {
        res.status(401);
        res.send('Invalid Credentials');
    }
  }, unauthorizedHandler);

reimbursementsRouter.get('/author/userid/:id',
  auth,
  async function (req: any, res, next) {
    if (req.user.role === 'admin' || req.user.role === 'finance') {
        res.status(200);
        res.json(PLACEHOLDER_OBJECT);
    } else {
        res.status(401);
        res.send('Invalid Credentials');
  }
}, unauthorizedHandler);

reimbursementsRouter.post('',
  auth,
  async function (req: any, res, next) {
    if (req.user.userid || (req.user.userid === 0)) {
      res.status(201);
      res.json(PLACEHOLDER_OBJECT);
    } else {
      res.status(401);
      res.send('Invalid Credentials');
    }
  }, unauthorizedHandler
);
