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

export async function insert (id: number, keyPairs) {
  const connection = await connections.connect();
  try {
    const {authorid, amount, datesubmitted, description, statusid} = keyPairs;
    const result = await connection.query(
      'insert into reimbursement (authorid, amount,datesubmitted,description, statusid) values ($1,$2,$3,$4, $5) returning *',
      [id || authorid,
       amount || '0.00' ,
       datesubmitted || (new Date).toISOString(),
       description || '',
       statusid || 2]
    );
    return result;
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