class Case {
  constructor(
    name,
    description,
    requiredAmount,
    requestType,
    needyCnic,
    needyIncome,
    needyAddress,
    userId,
    username
  ) {
    this.name = name;
    this.description = description;
    this.amountRequired = parseInt(requiredAmount);
    this.fulfilledAmount = 0;
    this.commitedAmount = 0;
    this.utilizedAmount = 0;
    this.requestType = requestType;
    this.needyCnic = needyCnic;
    this.needyIncome = needyIncome;
    this.needyAddress = needyAddress;
    this.userId = userId;
    this.caseStatus = "active";

    this.username = username;
  }
}
export default Case;
