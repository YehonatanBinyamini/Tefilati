import User from "../models/users/User";
import Prayer from "../models/users/Prayer";
import Gabay from "../models/users/Gabay";
import Synagogue from "../models/others/Synagogue";

export function RashiSNG(props) {
    const gabay = new Gabay("yehezkel", "Binyamini", "123456789", "0505238457", "Rashi", "hezi", 1234)

    const rashi = new Synagogue("רש\"י", "Rashi 42 Tel Aviv", gabay, 100);
    //console.log(rashi.shachrit)

    return rashi;
}
