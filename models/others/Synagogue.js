class Synagogue{
    constructor(name, address, seats, shacharit, mincha, arvit, dafYomi, uidGabay){
        this.name = name;
        this.address = address;
        this.seats = seats; //how much places
        this.uidGabay = uidGabay;
        //this.prayersList = Prayer.keys()
        this.shacharit = shacharit;
        this.mincha = mincha;
        this.arvit = arvit;
        this.dafYomi = dafYomi;
    }
    setShacharit(time) {
        this.shacharit = time;
    }
    setMincha(time) {
        this.mincha = time;
    }
    setArvit(time) {
        this.arvit = time;
    }
    setDafYomi(time) {
        this.dafYomi = time;
    }
}

export default Synagogue;