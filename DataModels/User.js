//Addd helper levels
//Move amount donated and utilized
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
    this.address = "";
    this.cnic = "";
    this.mobile = "";
    this.dob = "";
    this.country = "";
    this.city = "";
    this.gender = "";
    this.cnicUri = "";
    this.billUri = "";
  }
}

export default User;
