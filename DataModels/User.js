class User {
  constructor(name, email, photoUri) {
    this.name = name;
    this.email = email;
    this.isActiveHelper = false;
    this.isAdmin = false;
    this.isTrustedHelper = false;
    this.amountDonated = 0;
    this.amountUtilized = 0;
    this.photoUri = photoUri;
  }
}

export default User;
