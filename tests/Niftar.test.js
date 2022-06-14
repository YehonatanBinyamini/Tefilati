import Niftar from "../models/others/Niftar"

//    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){

const niftar = new Niftar("name", new Date())

test('checking note', () => {
    expect(niftar.fullName).toBeTruthy()
    expect(niftar.date).toBeTruthy()
})