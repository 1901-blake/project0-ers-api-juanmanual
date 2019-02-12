export class ReimbursementType {
    typeId: number;
    type: string;

    constructor() {
      this.typeId = NaN;
      this.type = '';
    }

    public getTypeId () {
      return this.typeId;
    }
    public setTypeId (statusId: number): this {
        this.typeId = statusId;
        return this;
    }

   public getType () {
      return this.type;
    }
    public setType (type: string ): this {
        this.type = type;
        return this;
    }
}