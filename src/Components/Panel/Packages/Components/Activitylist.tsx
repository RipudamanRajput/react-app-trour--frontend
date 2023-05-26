import axios from "axios";
import React, { useEffect, useState } from "react";
import { AlertPop, Sessioncheker } from "../../../../Global/Alert";
import { Select } from "@shopify/polaris";

function Activitylist(props: any) {
    const { label, value, placeholder, onChange, requiredIndicator } = props;
    const [sportsdata, setsportsdata] = useState<any>([]);
    const [loading, setloadings] = useState(false);

    useEffect(() => {
        setloadings(true);
        const sports = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getsports",
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(sports).then((res) => {
            Sessioncheker(res)
            const ar: any = [];
            res.data.forEach((item: any) => {
                ar.push({
                    id: item.id,
                    label: item.label,
                    value: item.value,
                })
            })
            setsportsdata(ar)
            setloadings(false);
        }).catch((err) => {
            setloadings(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [])
    return (
        <Select
            label={label ? label : undefined}
            placeholder={placeholder}
            value={value}
            requiredIndicator={requiredIndicator}
            options={sportsdata}
            onChange={(Select, id) => onChange(Select, id)}
        />
    )
}

export default Activitylist;