import Synagogue from "../models/others/Synagogue"

//    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){

const synagogue = new Synagogue("s1", "city street No.", "100", "6:30", "13:30", "20:30", "21:00","12345")

test('checking models', () => {
    expect(synagogue.setShacharit("8:00")).not.toBe(null)
    expect(synagogue.setMincha("14:00")).not.toBe(null)
    expect(synagogue.setArvit("21:00")).not.toBe(null)
    expect(synagogue.setDafYomi("21:30")).not.toBe(null)
})