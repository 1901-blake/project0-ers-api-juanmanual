import express from 'express'
import { userRouter } from './routers/users.router'
import { reimbursementsRouter } from './routers/reimbursements.router';

const app = express()


// register routers
app.use('/users', userRouter)
app.use('/reimbursements', reimbursementsRouter)

app.listen(3000)