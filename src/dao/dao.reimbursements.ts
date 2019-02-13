import { connections } from '../util/connections';
import { Reimbursement } from '../models/Reimbursement.models';
import { QueryResult } from 'pg';
import { User } from '../models/User.models';
import { UserRole } from '../models/UserRole.models';
import { ReimbursementStatus } from '../models/ReimbursementStatus.models';
import { ReimbursementType } from '../models/ReimbursementType.models';

function reimbursementsParseSql(reimbursementRow: QueryResult): Reimbursement {
  return (new Reimbursement)
      .setAmount(reimbursementRow['amount'])
      .setDateResolved(reimbursementRow['dateresolved'])
      .setDateSubmitted(reimbursementRow['datesubmitted'])
      .setDescription(reimbursementRow['description'])
      .setReimbursementId(reimbursementRow['reimbursementid'])
      .setAuthor(
        (new User)
        .setEmail(reimbursementRow['a_email'])
        .setFirstName(reimbursementRow['a_firstname'])
        .setLastName(reimbursementRow['a_lastname'])
        .setUser(reimbursementRow['a_username'])
        .setUserId(reimbursementRow['authorid'])
        .setRole(
          (new UserRole)
          .setRoleName(reimbursementRow['a_role_name'])
          .setRoleId(reimbursementRow['a_roleid'])
        )
      )
      .setResolver(
        (new User)
        .setEmail(reimbursementRow['res_email'])
        .setFirstName(reimbursementRow['res_firstname'])
        .setLastName(reimbursementRow['res_lastname'])
        .setUser(reimbursementRow['res_username'])
        .setUserId(reimbursementRow['resolverid'])
        .setRole(
          (new UserRole)
          .setRoleName(reimbursementRow['res_role_name'])
          .setRoleId(reimbursementRow['res_roleid'])
        )
      );
}

export async function getByStatusId (id: number): Promise<Reimbursement[]> {
  const connection = await connections.connect();
  try {
    const result = await connection.query(
        `select rmb.*, 
        a.email as a_email, 
        a.firstname as a_firstname, 
        a.lastname as a_lastname, 
        a.roleid as a_roleid, 
        a.username as a_username,
        a_role.rolename as a_role_name,
        res.email as res_email,
        res.firstname as res_firstname, 
        res.lastname as res_lastname, 
        res.roleid as res_roleid,
        res.username as res_username,
        res_role.rolename as res_role_name
        from 
        reimbursement as rmb
        left JOIN ers_user AS a
        ON rmb.authorid = a.userid
        left join ers_role as a_role
        on a.roleid = a_role.roleid
        left join ers_user as res
        on rmb.resolverid = res.userid
        left join ers_role as res_role
        on res.roleid = res_role.roleid
        where rmb.statusid = $1;`,
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
    const author = reimbursement.getAuthor();
    const amount = reimbursement.getAmount();
    const dateSubmitted = reimbursement.getDateSubmitted();
    const description = reimbursement.getDescription();
    const status = reimbursement.getStatus();

    const result = await connection.query(
      'insert into reimbursement (authorid, amount,datesubmitted,description, statusid) values ($1,$2,$3,$4, $5) returning *',
      [id || (author && author.getUserId()) || 0,
       amount || '0.00' ,
       dateSubmitted || (new Date).toISOString(),
       description || '',
       (status && status.getStatusId()) || 2]
    );
    console.log(result);
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
      const old: Reimbursement = reimbursementsParseSql(oldReimbursement.rows[0]);
      const newReimbursement: Reimbursement = old
        .setAmount(rawReimbursement.getAmount() || old.getAmount())
        .setDateResolved(rawReimbursement.getDateResolved() || old.getDateResolved())
        .setDateSubmitted(rawReimbursement.getDateSubmitted() || old.getDateSubmitted())
        .setDescription(rawReimbursement.getDescription() || old.getDescription())
        .setReimbursementId(old.getReimbursementId())
        .setAuthor((new User)
          .setUserId(rawReimbursement.getAuthor().getUserId() || old.getAuthor().getUserId()))
        .setResolver((new User)
          .setUserId(rawReimbursement.getResolver().getUserId() || old.getResolver().getUserId()))
        .setStatus((new ReimbursementStatus)
          .setStatusId((rawReimbursement.getStatus()
            && rawReimbursement.getStatus().getStatusId()) || old.getStatus().getStatusId()))
        .setType((new ReimbursementType)
          .setTypeId(rawReimbursement.getType().getTypeId() || old.getType().getTypeId()))
          


      // update iff sane value

      const result = await connection.query(
     `UPDATE reimbursement
      SET amount = $1,
      authorid = $2,
      dateresolved = $3,
      description = $4,
      resolverid = $5,
      statusid = $6,
      typeid = $7 WHERE reimbursementid = $8 returning *;`
      , [ newReimbursement.getAmount(),
          newReimbursement.getAuthor().getUserId(),
          newReimbursement.getDateResolved().toISOString() || (new Date).toISOString(),
          newReimbursement.getDescription(),
          newReimbursement.getResolver().getUserId(),
          newReimbursement.getStatus()?newReimbursement.getStatus().getStatusId():undefined,
          newReimbursement.getType()?newReimbursement.getType().getTypeId():undefined,
          rawReimbursement.getReimbursementId()
      ] );
      // construct and call some query
      return reimbursementsParseSql(result.rows[0]);
    } else {
      console.log("bad id = " , id);
     return undefined;
    }
  } finally {
    connection.release();
  }
}