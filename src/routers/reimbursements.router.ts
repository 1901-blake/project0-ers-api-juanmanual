import express from 'express';
import { auth } from '../middleware/auth.middleware';
import { unauthorizedHandler } from '../middleware/jwt-unauthorized-handler.middleware';

import * as reimbursementsDao from '../dao/dao.reimbursements';

export const reimbursementsRouter = express.Router();

const PLACEHOLDER_OBJECT = {place: 'holder'};


// GET url/reimbursements
reimbursementsRouter.get('/status/:id',
  auth,
  async function (req: any, res, next) {
    if (req.user && req.user.role === 'admin' || req.user.role === 'finance') {
        const result = await reimbursementsDao.getByStatusId(Number(req.params.id)); // return ReimbursementsDao.getAll(): <json object>
        if (Object.keys(result).length !== 0) {
          res.status(200).json(result);
        } else res.sendStatus(400);
    } else {
        res.status(401);
        res.send('Invalid Credentials');
    }
  }, unauthorizedHandler);

reimbursementsRouter.get('/author/userid/:id',
  auth,
  async function (req: any, res, next) {
    if (req.user && req.user.role === 'admin' || req.user.role === 'finance') {
        const reimbursements = await reimbursementsDao.getByStatusId(Number(req.params.id));

        if (Object.keys(reimbursements).length !== 0 ) {
          res.status(200).json(reimbursements);
        } else res.sendStatus(400);
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
      res.status(401).send('Invalid Credentials');
    }
  }, unauthorizedHandler);

reimbursementsRouter.patch('',
  auth,
  async function (req: any, res, next) {
    console.log('the request role: ', req.user && req.user.role);
    if (req.user && (req.user.role === 'admin' || req.user.role === 'finance')) {
      res.status(200).json(PLACEHOLDER_OBJECT);
    } else {
      res.status(401).send('Invalid Credentials');
    }
  }, unauthorizedHandler);
