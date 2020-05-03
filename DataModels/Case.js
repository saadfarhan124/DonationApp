class Case {
  constructor(name, description, requiredAmount, userId) {
    this.name = name;
    this.description = description;
    this.requiredAmount = requiredAmount;
    this.fullfilledAmount = 0;
    this.userId = userId;
    this.caseStatus = "inactive";
  }
}
export default Case;
