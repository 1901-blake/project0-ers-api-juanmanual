/**
 * The ReimbursementStatus model is used to track the status of reimbursements. Status possibilities are Pending, Approved, or Denied
 */
export default class ReimbursementStatus {
  statusId: number
  status: string
  constructor (statusId: number, status: string)
  {
    this.statusId =statusId
    this.status = status
  }
}