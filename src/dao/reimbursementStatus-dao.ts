import {ReimbursementStatus} from '../models/reimbursementStatus'
import {ConnectionFactory} from '../util/connection-factory'

export class ReimbursementStatusDao {
    public async getAllUsers(): Promise<ReimbursementStatus[]> {
        let pool = ConnectionFactory.getConnectionPool()

        const client = await pool.connect()
        
        const result = await client.query('select * from ReimbursementStatus')

        return result.rows
    }
}