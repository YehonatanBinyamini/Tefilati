class Payment {
    constructor(docId, subject, date, fullName, price, type, hakdasha) {
       this.docId = docId;
       this.subject = subject;
       this.date = date;
       this.fullName = fullName;
       this.price = price;
       this.type = type;
       this.hakdasha = hakdasha;
      }
}

export default Payment;