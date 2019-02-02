import { connections } from '../util/connections';

export async function getById (id: number): Promise<Object> {
  const connection = await connections.connect();
  try {
    const result = await connection.query(
        'select * from users where user_id = $1',
        [id]
    );
    return result.rows[0];

  } finally {
    connection.release();
  }
}