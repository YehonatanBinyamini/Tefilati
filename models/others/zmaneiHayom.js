class zmaneiHayom {
    constructor(data) {
        this.i = 0
        this.timesArray = []
        this.timesArray.push({id: this.i++, name:"עלות השחר(72 ד\')", value: data["times"]["alotHaShachar"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"זמן טלית ותפילין", value: data["times"]["misheyakirMachmir"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"זריחה", value: data["times"]["sunrise"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"ס\"ז ק\"ש מג\"א", value: data["times"]["sofZmanShmaMGA"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"ס\"ז ק\"ש גר\"א", value: data["times"]["sofZmanShma"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"ס\"ז תפילה מג\"א", value: data["times"]["sofZmanTfillaMGA"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"ס\"ז תפילה גר\"א", value: data["times"]["sofZmanTfilla"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"חצות היום והלילה", value: data["times"]["chatzot"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"מנחה גדולה", value: data["times"]["minchaGedola"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"מנחה קטנה", value: data["times"]["minchaKetana"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"פלג המנחה", value: data["times"]["plagHaMincha"].slice(11,16)});
        this.timesArray.push({id: this.i++, name:"שקיעה", value: data["times"]["sunset"].slice(11,16)});
        const sunset = new Date(data["times"]["sunset"]);
        sunset.setMinutes(sunset.getMinutes() + 20);
        this.timesArray.push({id: this.i++, name:"צאת הכוכבים", value: sunset.toLocaleString().slice(10,15)});
        //"tzeit7083deg": "2021-03-28T19:27:00+03:00",
        //"tzeit72min": "2021-03-28T20:10:00+03:00",
        //"tzeit85deg": "2021-03-28T19:34:00+03:00",
        //"tzeit42min": "2021-03-28T19:40:00+03:00",
    }
    /*constructor(data) {
        this.alotHaShachar = {name:"עלות השחר", value: data["times"]["alotHaShachar"].slice(11,16)};
        this.chatzot = {name:"חצות היום והלילה", value: data["times"]["chatzot"].slice(11,16)};
        this.minchaGedola = {name:"מנחה גדולה", value: data["times"]["minchaGedola"].slice(11,16)};
        this.minchaKetana = {name:"מנחה קטנה", value: data["times"]["minchaKetana"].slice(11,16)};
        this.misheyakirMachmir = {name:"זמן טלית ותפילין", value: data["times"]["misheyakirMachmir"].slice(11,16)};
        this.plagHaMincha = {name:"פלג המנחה", value: data["times"]["plagHaMincha"].slice(11,16)};
        this.sofZmanShma = {name:"ס\"ז ק\"ש גר\"א", value: data["times"]["sofZmanShma"].slice(11,16)};
        this.sofZmanShmaMGA = {name:"ס\"ז ק\"ש מג\"א", value: data["times"]["sofZmanShmaMGA"].slice(11,16)};
        this.sofZmanTfilla = {name:"ס\"ז תפילה גר\"א", value: data["times"]["sofZmanTfilla"].slice(11,16)};
        this.sofZmanTfillaMGA = {name:"ס\"ז תפילה מג\"א", value: data["times"]["sofZmanTfillaMGA"].slice(11,16)};
        this.sunrise = {name:"זריחה", value: data["times"]["sunrise"].slice(11,16)};
        this.sunset = {name:"שקיעה", value: data["times"]["sunset"].slice(11,16)};
        const sunset = new Date(data["times"]["sunset"]);
        sunset.setMinutes(sunset.getMinutes() + 20);
        this.tzeitHakochavim  = {name:"צאת הכוכבים", value: sunset.toLocaleString().slice(11,16)};
        //"tzeit7083deg": "2021-03-28T19:27:00+03:00",
        //"tzeit72min": "2021-03-28T20:10:00+03:00",
        //"tzeit85deg": "2021-03-28T19:34:00+03:00",
        //"tzeit42min": "2021-03-28T19:40:00+03:00",
    } */
}

export default zmaneiHayom;