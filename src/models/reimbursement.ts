/**
 * used to represent a single reimbursement that 
 * an employee would submit
 */
export default class Reimbursement {
  reimbursementId: number
  author: number
  amount: number
  dateSubmitted: number
  dateResolved: number
  resolver: number
  status: number
  type: number

  constructor(reimbursementId: number, author: number, amount: number, dateSubmitted: number, dateResolved: number, resolver: number, status: number, type: number)
  {
    this.reimbursementId = reimbursementId
    this.author = author
    this.amount = amount
    this.dateSubmitted = dateSubmitted
    this.dateResolved = dateResolved
    this.resolver = resolver
    this.status = status
    this.type = type
  }
}