import express from 'express';
import { auth } from '../middleware/auth.middleware';
import { unauthorizedHandler } from '../middleware/jwt-unauthorized-handler.middleware';

import * as reimbursementsDao from '../dao/dao.reimbursements';
import { Reimbursement } from '../models/Reimbursement.models';
import { User } from '../models/User.models'
import { ReimbursementStatus } from '../models/ReimbursementStatus.models';
import { ReimbursementType } from '../models/ReimbursementType.models';
export const reimbursementsRouter = express.Router();



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
      const reimbursement = new Reimbursement;

      const result = await reimbursementsDao.insert(reimbursement, req.user.userid);
      if (req.user && (req.user.role))
        res.status(201).json(result);
      else res.sendStatus(400);
    } else {
      res.status(401).send('Invalid Credentials');
    }
  }, unauthorizedHandler);

reimbursementsRouter.patch('',
  auth,
  async function (req: any, res, next) {
    if (req.body.reimbursementId === undefined) {
      if(!req.user ) {
        res.sendStatus(401);
      } else if ( req.user.role !== 'admin' || req.user.role !== 'finance') {
       res.status(401).send("Invalid Credentials");
      } else res.sendStatus(400);

    } else if (req.user && (req.user.role === 'admin' || req.user.role === 'finance')) {
      
     try {
      const reimbursement = (new Reimbursement)
        .setAmount(req.body.amount)
        .setAuthor((new User).setUserId(req.body.userId))
        .setDateResolved(new Date())
        .setDescription(req.body.description)
        .setResolver((new User).setUserId(req.user.userid))
        .setReimbursementId(req.body.reimbursementId)
        .setStatus((new ReimbursementStatus).setStatusId(req.body.statusId))
        .setType((new ReimbursementType).setTypeId(req.body.typeId));
        
      const result = await reimbursementsDao.update(reimbursement);
      result?res.status(200).json(result):res.sendStatus(400);
     } catch (error){
       console.log(error);
       console.log("failed here");
     }
    } else {
      res.status(401).send('Invalid Credentials');
    }
  }, unauthorizedHandler);
