/**
 *  The Role model is used to track what permissions a user has
 */
export default class Role  {
  roleId: number
  role: string
  
  constructor (roleId: number, role: string) {
      this.roleId = roleId
      this.role = role
  }
}