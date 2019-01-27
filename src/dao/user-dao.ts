import {User} from '../models/user'
import {ConnectionFactory} from '../util/connection-factory'

export class UserDao {
    public async getAllUsers(): Promise<User[]> {
        let pool = ConnectionFactory.getConnectionPool()

        const client = await pool.connect()
        
        const result = await client.query('select * from user')

        return result.rows
    }
}