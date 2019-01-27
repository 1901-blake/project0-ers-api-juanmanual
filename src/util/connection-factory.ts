import {Pool} from 'pg';
import * as Postgres from './.database.config'
/**
 * makes a connection pool we can leverege
 * throughout the application
 */

export class SessionFactory {
  static cred = {
    database: Postgres.connectionDB,
    host: Postgres.connectionEndpoint,
    user: Postgres.connectionUser,
    password: Postgres.connectionPassword,
    // max connections at once
    max: 10,
  }
  static pool: Pool

  static created = false;
  static getConnectionPool(): Pool {
    if(!this.created) {
      this.pool = new Pool(this.cred)
    }
    return this.pool;
  }
}

