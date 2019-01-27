import {Role} from '../models/role'
import {ConnectionFactory} from '../util/connection-factory'

export class RoleDao {
    public async getAllUsers(): Promise<Role[]> {
        let pool = ConnectionFactory.getConnectionPool()

        const client = await pool.connect()
        
        const result = await client.query('select * from role')

        return result.rows
    }
}