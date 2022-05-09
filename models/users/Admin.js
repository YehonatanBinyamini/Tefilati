class Admin extends User{
    constructor(firstName, lastName, id, phoneNumber, userName, password){
        super(firstName, lastName, id, phoneNumber, userName, password);
        this.isAdmin = true;
    }
}

function foo(){
    console.log('hi');
}