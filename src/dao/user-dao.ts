import {User} from '../models/user'
import {ConnectionFactory} from '../util/connection-factory'
import { json } from 'body-parser';

export class UserDao {
    public async getAllUsers(): Promise<User[]> {
        let pool = ConnectionFactory.getConnectionPool()

        const client = await pool.connect()
        
        const result = await client.query('select * from user')

        return result.rows
    }

    public async getUserByLoginInfo(username: string, password: string): Promise<User> {
        let pool = ConnectionFactory.getConnectionPool()

        const client = await pool.connect()
        
        const result = await client.query(`select * from user where username = ${username} and password = ${password}`)

        if (result.rowCount === 1) {
          return result.rows[0]
        }
        else throw new Error ('bad login')
    }
}