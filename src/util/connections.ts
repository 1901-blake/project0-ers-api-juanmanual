import { Pool } from 'pg';
import * as env from '../.env/config';


export const connections = new Pool({
  user: env.dbUsername,
  host: env.dbUrl,
  database: env.dbName,
  password: env.dbPassword,
  port: env.dbPort,
  max: 7
});