import express from 'express'
import { userRouter } from './routers/users.router'
import { reimbursementsRouter } from './routers/reimbursements.router';
import bodyParser from 'body-parser'

const app = express()

// log incoming requests
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path}
  and method: ${req.method}`)
  next()
})

// parse the body
app.use(bodyParser.json())

// handle login requests
app.post('/login', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  

})

// register routers
app.use('/users', userRouter)
app.use('/reimbursements', reimbursementsRouter)

app.listen(3000)