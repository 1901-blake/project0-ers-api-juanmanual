export class UserRole {
  roleId: number;
  roleName: string;

  public setRoleId(roleId: number): this{
    this.roleId = roleId;
    return this;
  }
 public getRoleId(): number{
    return this.roleId;
  }

  public setRoleName(roleName: string): this{
    this.roleName= roleName;
    return this;
  }
 public getRoleName(): string{
    return this.roleName;
  }
}