class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.isActiveHelper = false;
    this.isAdmin = false;
    this.isTrustedHelper = false;
  }
}

export default User;
