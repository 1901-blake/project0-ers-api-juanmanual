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

export async function getAll (): Promise<Object[]> {
  console.log('trying to find all');
  const connection = await connections.connect();
  console.log('connection established');
  try {
    const result = await connection.query(
        'select * from ers_user'
    );
    return result.rows;
  } finally {
    connection.release();
  }
}
