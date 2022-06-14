import User from "../models/users/User"

//    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){

const user = new User("user1", "user1", "1234", "0501234567", "i@1.il", "123456", "synagogue")
const spc = ", "

test('checking models', () => {
    expect(user.toString()).toBe(user.firstName + spc + user.lastName + spc + user.email)
    expect(user.setIsGabay()).not.toBe(null)
})