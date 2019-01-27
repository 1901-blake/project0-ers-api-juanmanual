import {Reimbursement} from '../models/reimbursement'
import {ConnectionFactory} from '../util/connection-factory'

export class ReimbursementDao {
    public async getAllUsers(): Promise<Reimbursement[]> {
        let pool = ConnectionFactory.getConnectionPool()

        const client = await pool.connect()
        
        const result = await client.query('select * from Reimbursement')

        return result.rows
    }
}