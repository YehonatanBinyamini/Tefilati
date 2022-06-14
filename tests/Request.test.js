import Request from "../models/others/Request"

//    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){

const request = new Request("synagogue", "address", 100, "user1", "user1", "0501234567", "i@1.il", "123456", "1234" ,"8:00", "14:00", "20:30", "21:00")

test('checking note', () => {
    expect(request.synagogueName).toBeTruthy()
    expect(request.synagogueAddress).toBeTruthy()
    expect(request.synagogueSeats).toBeGreaterThan(0)
    expect(request.firstName).toBeTruthy()
    expect(request.lastName).toBeTruthy()
    expect(request.phone).toBeTruthy()
    expect(request.email).toBeTruthy()
    expect(request.password).toBeTruthy()
    expect(request.uid).toBeTruthy()
    expect(request.shacharit).toBeTruthy()
    expect(request.mincha).toBeTruthy()
    expect(request.arvit).toBeTruthy()
    expect(request.dafYomi).toBeTruthy()
})