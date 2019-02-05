import { connections } from '../util/connections';

export async function getById (id: number): Promise<Object> {
  const connection = await connections.connect();
  try {
    const result = await connection.query(
        'select * from ers_user where userid = $1',
        [id]
    );
    return result.rows[0];

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

export async function getAll (): Promise<Object[]> {
  const connection = await connections.connect();
  try {
    const result = await connection.query(
        'select * from ers_user'
    );
    return result.rows;
  } finally {
    connection.release();
  }
}

export async function update (keyPairs) {
  const connection = await connections.connect();
  try {
    if (keyPairs.userid !== undefined) {
      const id = keyPairs.userid;

      const result = await connection.query(
      'UPDATE ers_user SET userid = $1 WHERE userid = $1 returning * '
      , [id]);
      // construct and call some query
      return result.rows[0];
    }
  } finally {
    connection.release();
  }
}
