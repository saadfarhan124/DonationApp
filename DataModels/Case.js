class Case {
  constructor(name, description, requiredAmount, userId, caseStatus) {
    this.name = name;
    this.description = description;
    this.requiredAmount = requiredAmount;
    this.fullfilledAmount = 0;
    this.userId = userId;
    this.caseStatus = caseStatus;
    this.utilizedAmount = 0;
  }
}
export default Case;
