import {UserDao} from '../dao/user-dao'
export const login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let userDao = new UserDao();

  try {
    req.user = userDao.getUserByLoginInfo(username, password);
    next()
  } catch(e ){
    console.log('bad login attempt')
    res.sendStatus(400)
  }
  
}