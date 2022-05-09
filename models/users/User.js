
class User{
    constructor(firstName, lastName, uid, phoneNumber, email, password, synagogue){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.synagogue = synagogue;
        this.uid = uid;
        this.isGabay = false;
    }
    toString() {
        spc = ', '
        return this.firstName + spc + this.lastName + spc + this.email
    }
    setIsGabay(param) {
        this.isGabay = param;
    }
}

export default User;