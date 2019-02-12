import { User } from './User.models';
import { ReimbursementType } from './ReimbursementType.models';
import { ReimbursementStatus } from './ReimbursementStatus.models';

export class Reimbursement {
    private reimbursementId: number;
    private user: User;
    private resolver: User;

    private amount: string;
    private description: string;

    private status: ReimbursementStatus;
    private type: ReimbursementType;

    private dateSubmitted: Date;
    private dateResolved: Date;

    constructor() {
        this.user = undefined;
        this.resolver = undefined;
        this.amount = '0.00';
        this.description = '';
        this.dateSubmitted = undefined;
        this.dateResolved = undefined;
        this.reimbursementId = NaN;
        this.status = undefined;
        this.type = undefined;
    }

    public getReimbursementId(): number {
        return this.reimbursementId;
    }

    public setReimbursementId(reimbursementId: number): this {
        this.reimbursementId = reimbursementId;
        return this;
    }

    public getAuthor(): User {
        return this.user;
    }
    public setAuthor(user: User): this {
        this.user = user;
        return this;
    }

    public getResolver(): User {
        return this.resolver;
    }
    public setResolver(resolver: User): this {
        this.resolver = resolver;
        return this;
    }

    public getAmount(): string {
        return this.amount;
    }
    public setAmount(amount: string): this {
        this.amount = amount;
        return this;
    }

    public getDescription(): string {
        return this.description;
    }
    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public getDateSubmitted(): Date {
        return this.dateSubmitted;
    }
    public setDateSubmitted(dateSubmitted: Date): this {
        this.dateSubmitted = dateSubmitted;
        return this;
    }

    public getDateResolved(): Date {
        return this.dateResolved;
    }
    public setDateResolved(dateResolved: Date): this {
        this.dateResolved = dateResolved;
        return this;
    }

    public getStatus(): ReimbursementStatus {
        return this.status;
    }
    public setStatus(status: ReimbursementStatus): this {
        this.status = status;
        return this;
    }

    public getType(): ReimbursementType {
        return this.type;
    }
    public setType(type: ReimbursementType): this {
        this.type = type;
        return this;
    }

}