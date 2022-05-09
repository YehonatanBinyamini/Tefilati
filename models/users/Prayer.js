import User from "./User";

class Prayer extends User{
    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){
        super(firstName, lastName, uid, phoneNumber, email, password, synagogue);
        
    }

}

// Firestore data converter


export default Prayer;