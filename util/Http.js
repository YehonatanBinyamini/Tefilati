import  React, { setState} from "react";
import axios from "axios";
import zmaneiHayom from "../models/others/zmaneiHayom";

    FIREBASE_URL = 'https://tefilati-915e0-default-rtdb.firebaseio.com'
    const zmanim = {}
    //const [data, setData] = setState(NaN);
    
    export async function getAPITimes(day, locationID) {
        const response = await axios.get(
            'https://www.hebcal.com/zmanim?cfg=json&geonameid=295530&lg=h&date=2021-03-30',
        );
        const data = new zmaneiHayom(response.data);

        return data;
    }

    
    export function storeDayTimes() {
        getAPITimes(0,0);
        axios.post(
        FIREBASE_URL + '/dayTimes.json', 
        JSON.stringify(data)
        //data
    );
}
