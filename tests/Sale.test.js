import Sale from "../models/others/Sale"

//    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){

const sale = new Sale("s1", 100, "type1", false)

test('checking models', () => {
    expect(sale.setIsSold(true)).not.toBe(null)
})
