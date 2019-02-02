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

export async function authenticate(username: string, password: string): Promise<boolean> {
  const connection = await connections.connect();

  try {
    const result = await connection.query(
      'select count() from ers_user where username=$1 and password=$2',
      [username, password]
    );
    return result.rows[0];

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
