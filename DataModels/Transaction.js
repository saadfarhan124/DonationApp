class Transaction {
  constructor(amount, caseId, donorId, reminderData) {
    this.amount = amount;
    this.caseId = caseId;
    this.donorId = donorId;
    this.status = "commited";
    this.reminderData = reminderData;
  }
}
export default Transaction;
