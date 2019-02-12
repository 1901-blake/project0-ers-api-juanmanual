import { connections } from '../util/connections';
import { Reimbursement } from '../models/Reimbursement.models';
import { User } from '../models/User.models';
import { QueryResult } from 'pg';

function reimbursementsParseSql(reimbursementRow: QueryResult): Reimbursement {
  return (new Reimbursement)
      .setAmount(reimbursementRow['amount'])
      .setDateResolved(reimbursementRow['dateresolved'])
      .setDateSubmitted(reimbursementRow['datesubmitted'])
      .setDescription(reimbursementRow['description'])
      .setReimbursementId(reimbursementRow['reimbursementid'])
      .setAuthor(new User)
      .setResolver(new User);
}

export async function getByStatusId (id: number): Promise<Reimbursement[]> {
  const connection = await connections.connect();
  try {
    const result = await connection.query(
        'select * from reimbursement where statusid = $1;',
        [id]
    );
    return result.rows.map(reimbursementRow => reimbursementsParseSql(reimbursementRow));

  } finally {
    connection.release();
  }
}

export async function insert (reimbursement: Reimbursement, id?: number) {
  const connection = await connections.connect();
  try {
    const authorid = reimbursement.getAuthor().getUserId();
    const amount = reimbursement.getAmount();
    const dateSubmitted = reimbursement.getDateSubmitted();
    const description = reimbursement.getDescription();
    const statusId = reimbursement.getStatus().getStatusId();

    const result = await connection.query(
      'insert into reimbursement (authorid, amount,datesubmitted,description, statusid) values ($1,$2,$3,$4, $5) returning *',
      [id || authorid,
       amount || '0.00' ,
       dateSubmitted || (new Date).toISOString(),
       description || '',
       statusId || 2]
    );
    return reimbursementsParseSql(result);
  } finally {
    connection.release();
  }
}

export async function update (rawReimbursement: Reimbursement) {
  const connection = await connections.connect();
  try {
    const id = rawReimbursement.getReimbursementId();
    if (id || id === 0) {
      const oldReimbursement = await connection.query(
        'SELECT * FROM reimbursement where reimbursementid = $1',
        [id]
      );
      if (oldReimbursement.rows.length === 0) {
        return undefined;
      }
      const updatedReimbursement = reimbursementsParseSql(oldReimbursement);

      const newDateResolved = rawReimbursement.getDateResolved();
      const newAuthor = rawReimbursement.getAuthor();
      const newResolver = rawReimbursement.getResolver();
      const newStatus = rawReimbursement.getStatus();
      const newType = rawReimbursement.getType();
      const newAmount = rawReimbursement.getAmount();
      const newDescription = rawReimbursement.getDescription();

      // update iff sane value

      newAuthor && updatedReimbursement.setAuthor(newAuthor);
      newResolver && updatedReimbursement.setResolver(newResolver);
      newStatus && updatedReimbursement.setStatus(newStatus);
      newType && updatedReimbursement.setType(newType);
      newAmount && updatedReimbursement.setAmount(newAmount);
      newDateResolved && updatedReimbursement.setDateResolved(newDateResolved);
      newDescription && updatedReimbursement.setDescription(newDescription);

      const result = await connection.query(
     `UPDATE reimbursement
      SET amount = $1,
      authorid = $2,
      dateresolved = $3,
      description = $4,
      resolverid = $5,
      statusid = $6,
      typeid = $7 WHERE reimbursementid = $8 returning *;`
      , [ updatedReimbursement.getAmount() || '0.0',
          updatedReimbursement.getAuthor().getUserId() || 0,
          updatedReimbursement.getDateResolved().toISOString || (new Date).toISOString,
          updatedReimbursement.getDescription() || '',
          updatedReimbursement.getResolver().getUserId() || 0,
          updatedReimbursement.getStatus().getStatusId() || 2,
          updatedReimbursement.getType().getTypeId() || 4
      ] );
      // construct and call some query
      return reimbursementsParseSql(result.rows[0]);
    }
  } finally {
    connection.release();
  }
}