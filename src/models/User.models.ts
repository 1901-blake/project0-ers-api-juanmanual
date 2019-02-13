import { UserRole } from "./UserRole.models";

export class User {
    private userId: number;
    private username: string;
    private firstname: string;
    private lastname: string;
    private email: string;
    private role: UserRole;

    constructor() {
      this.userId = NaN;
      this.username = '';
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.role = new UserRole;
    }

    setUserId(id: number) {
      this.userId = id;
      return this;
    }
    getUserId() {
        return this.userId;
    }

    setFirstName(first: string) {
      this.firstname = first;
      return this;
    }
    getFirstName() {
        return this.firstname;
    }
    setUser(first: string) {
      this.username = first;
      return this;
    }

    getUserName() {
      return this.username;
    }

    setLastName(first: string) {
      this.lastname = first;
      return this;
    }

    getLastName() {
      return this.lastname;
    }

    setEmail(first: string) {
      this.email = first;
      return this;
    }
    getEmail() {
      return this.email;
    }
    setRole(role: UserRole) {
      this.role = role;
      return this;
    }
    getRole() {
      return this.role;
    }
  }