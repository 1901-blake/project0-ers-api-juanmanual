import { connections } from '../util/connections';


export async function getByStatusId (id: number): Promise<Object> {
  const connection = await connections.connect();
  try {
    const result = await connection.query(
        'select * from reimbursement where statusid = $1;',
        [id]
    );
    return result.rows;

  } finally {
    connection.release();
  }
}

export async function update (keyPairs) {
  const connection = await connections.connect();
  try {
    if (keyPairs.reimbursementid !== undefined) {
      const id = keyPairs.reimbursementid;

      const result = await connection.query(
      'UPDATE reimbursement SET reimbursementid = $1 WHERE reimbursementid = $1 returning * '
      , [id]);
      // construct and call some query
      return result.rows[0];
    }
  } finally {
    connection.release();
  }
}