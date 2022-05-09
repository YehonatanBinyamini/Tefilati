class Request {
    constructor(synagogueName, synagogueAddress, synagogueSeats, firstName, lastName, phone, email, password, uid, shacharit, mincha, arvit, dafYomi) {
      
       this.synagogueName = synagogueName;
       this.synagogueAddress = synagogueAddress;
       this.synagogueSeats = synagogueSeats;
       this.firstName = firstName;
       this.lastName = lastName;
       this.phone = phone;
       this.email = email;
       this.password = password;
       this.uid = uid;
       this.shacharit = shacharit;
       this.mincha = mincha;
       this.arvit = arvit;
       this.dafYomi = dafYomi;
      }
}


export default Request;