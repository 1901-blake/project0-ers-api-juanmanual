import express from 'express';
import bodyParser from 'body-parser';
import * as env from './.env/config';

import { reimbursementsRouter } from './routers/reimbursements.router';
import { usersRouter } from './routers/users.router';

import jwt from 'jsonwebtoken';


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.post('/login', (req, res, next) => {
  const username = req.body.user;
  const password = req.body.password;

  jwt.sign(username, env.tokenSecret);
  console.log('processing ', username, password);

  res.json({username});

});

app.use('/reimbursements', reimbursementsRouter);
app.use('/users', usersRouter);



// handles bad jwt references
app.listen(3000);
console.log('app started on 3000');