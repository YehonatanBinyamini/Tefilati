import Payment from "../models/others/Payment"

//    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){

const pay = new Payment("d1" , "subject", new Date(), "name", 100, "type", "hakdash")

test('checking note', () => {
    expect(pay.date).toBeTruthy()
    expect(pay.fullName).toBeTruthy()
    expect(pay.hakdasha).toBeTruthy()
    expect(pay.price).toBeTruthy()
    expect(pay.hakdasha).toBeTruthy()
    expect(pay.type).toBeTruthy()
    expect(pay.subject).toBeTruthy()
})