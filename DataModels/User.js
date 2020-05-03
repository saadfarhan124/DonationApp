class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.isActiveHelper = false;
    this.isAdmin = false;
    this.isTrustedHelper = false;
    this.amountDonated = 0;
    this.amountUtilized = 0;
  }
}

export default User;
