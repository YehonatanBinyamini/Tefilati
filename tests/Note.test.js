import Note from "../models/others/Note"

//    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){

const note = new Note("g1", new Date() , "subject", "body")

test('checking note', () => {
    expect(note.gabay).toBeTruthy()
    expect(note.date).toBeTruthy()
    expect(note.subject).toBeTruthy()
    expect(note.body).toBeTruthy()
})