import { connections } from '../util/connections';
import { User } from '../models/User.models';
import { QueryResult } from 'pg';
import { UserRole } from '../models/UserRole.models';

function usersParseSql(userRow: QueryResult): User{
  return (new User)
  .setFirstName(userRow['firstname'])
  .setLastName(userRow['lastname'])
  .setEmail(userRow['email'])
  .setUser(userRow['username'])
  .setUserId(userRow['userid'])
  .setRole(
    (new UserRole)
    .setRoleId(userRow['roleid'])
    .setRoleName(userRow['rolename']));
}

export async function getById (id: number): Promise<User> {
  const connection = await connections.connect();
  try {
    const result = await connection.query(
        'select * from ers_user where userid = $1',
        [id]
    );
    return usersParseSql(result.rows[0]);

  } finally {
    connection.release();
  }
}

export async function authenticate(username: string, password: string): Promise<Object> {
  const connection = await connections.connect();

  try {
    const result = await connection.query(
      `select userid, username, rolename from ers_user left join ers_role using (roleid)
      where username = $1 and password = $2;`,
      [username, password]
    );
    const sub = result.rows[0].username;
    const role = result.rows[0].rolename;
    const userid = result.rows[0].userid;
    return {sub, role, userid};

  } catch {
    return undefined;
  } finally {
    connection.release();
  }

}

export async function getAll (): Promise<User[]> {
  const connection = await connections.connect();
  try {
    const result = await connection.query(
        `select 
        u.userid, 
        u.username, 
        u.firstname, 
        u.lastname, 
        u.email, 
        u.roleid, 
        r.rolename
        from ers_user as u
        left join ers_role r
        on u.roleid = r.roleid;
        `
    );
    return result.rows.map(userRow => usersParseSql(userRow));
  } finally {
    connection.release();
  }
}

export async function update (rawUser: User) {
  // gets the associated user object and may over-write some fields
  const connection = await connections.connect();
  try {
    if (rawUser && rawUser.getUserId() !== undefined) {
      const id = rawUser.getUserId();

      const old: User = await getById(id);
      const newUser: User = old.setEmail(rawUser.getEmail() || old.getEmail())
        .setFirstName(rawUser.getFirstName() || old.getFirstName())
        .setLastName(rawUser.getLastName() || old.getLastName())
        .setRole((new UserRole).setRoleId(rawUser.getRole().getRoleId() || old.getRole().getRoleId()))
        .setUser(rawUser.getUserName() || old.getUserName())
        .setUserId(rawUser.getUserId() || old.getUserId());

      console.log(newUser);
      
      const result = await connection.query(
        `
        update
        ers_user
        set email = $1,
        firstname = $2,
        lastname = $3,
        roleid = $4,
        username = $5
        where userid = $6
        returning *;
        `,
        [newUser.getEmail(),
         newUser.getFirstName(),
         newUser.getLastName(),
         newUser.getRole().getRoleId() || old.getRole().getRoleId(),
         newUser.getUserName(),
         id]
      )
      return usersParseSql(result.rows[0]);
    } else return undefined;
  } finally {
    connection.release();
  }
}
