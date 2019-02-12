import express from 'express';
import bodyParser from 'body-parser';

import { reimbursementsRouter } from './routers/reimbursements.router';
import { usersRouter } from './routers/users.router';

import { login } from './middleware/login.middleware';


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use((req, resp, next) => {
  console.log(req.get('host'));
  (process.env.MOVIE_API_STAGE === 'prod')
    ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
    : resp.header('Access-Control-Allow-Origin', req.headers.referer.split('/').splice(0, 3).join('/'));
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.post('/login', login);

app.use('/reimbursements', reimbursementsRouter);
app.use('/users', usersRouter);



// handles bad jwt references
app.listen(3000);
console.log('app started on 3000');


