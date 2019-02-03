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

export async function getByUserId (id: number): Promise<Object> {
    const connection = await connections.connect();
    try {
        const result = await connection.query(
            'select * from reimbursement where authorid = $1;',
            [id]
        );
        return result.rows[0];
    } finally {
      connection.release();
    }
}

export async function createReimbursement (): Promise<Object> {
    const connection = await connections.connect();
    try {
        const result = await connection.query(
            ''
        );
        return result.rows[0];
    } finally {
      connection.release();
    }
}