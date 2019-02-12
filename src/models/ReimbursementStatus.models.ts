export class ReimbursementStatus {
  statusId: number;
  status: string;

  constructor() {
    this.statusId = NaN;
    this.status = '';
  }

  public getStatusId () {
    return this.statusId;
  }
  public setStatusId (statusId: number): this {
      this.statusId = statusId;
      return this;
  }

  public getStatus () {
    return this.status;
  }
  public setStatus (status: string): this {
      this.status = status;
      return this;
  }

}