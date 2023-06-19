import axios from "axios";
import { AlertPop, Sessioncheker } from "../../../../../Global/Alert";

export const Includestoarray = (includes: any, include_data: any) => {
    let ar: any = [];
    includes.forEach((element: any, index: number) => {
        include_data.forEach((item: any, i: number) => {
            if (element === item.value) {
                ar.push({
                    include_id: item.value,
                    title: item.label
                })
            }
        })
    });
    return ar;
}

export const Itinerariestoarray = (itineraries: any) => {
    let ar: any = [];
    const activitiestoarray = (activities: any) => {
        const arr: any = [];
        const { title, description, ...rest } = activities;
        Object.keys(rest).forEach((item: any) => {
            arr.push(rest[item])
        })
        return arr;
    }
    Object.keys(itineraries).forEach((element: any) => {
        ar.push({
            title: itineraries[element]?.title,
            description: itineraries[element]?.description,
            activities: activitiestoarray(itineraries[element])
        })
    });
    return ar;
}

export function lenthtoarray(length: any) {
    const ar = [];
    for (let i = 0; i < length; i++) {
        ar.push(i)
    }
    return ar;
}

export const deleteincludeitem = (data: any,setcustomizerefresh:any,customizerefresh:any) => {
    const config = {
        method: "delete",
        url: process.env.REACT_APP_SHOP_NAME + "/api/removeicludeitem/" + data,
        withCredentials: true,
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN || '',
            'Content-Type': 'application/json'
        }
    };
    axios(config).then((res) => {
        Sessioncheker(res);
        setcustomizerefresh(!customizerefresh)

    }).catch((err) => {
        AlertPop("Error", err.toString(), "error");
    })
}