class Admin extends User{
    constructor(firstName, lastName, uid, phoneNumber, email, password){
        super(firstName, lastName, uid, phoneNumber, email, password, null);
    }
}
