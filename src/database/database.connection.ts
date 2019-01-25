import {Client} from 'pg'
import { connectionString } from './.database.config';
/**
 * allows accessing the database
 * where the models are stored
 */
export let client = new Client(connectionString)

