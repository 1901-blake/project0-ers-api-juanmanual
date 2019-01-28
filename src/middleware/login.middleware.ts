import {UserDao} from '../dao/user-dao'
export const login = (req, res ) => {
  let username = req.body.username;
  let password = req.body.password;

  let userDao = new UserDao();

  try {
    const user = userDao.getUserByLoginInfo(username, password);
    req.session.user = user;
    res.json(user)
  } catch(e ){
    console.log('bad login attempt')
    
    res.status(400).send('Bad login attempt')
  }
  
}