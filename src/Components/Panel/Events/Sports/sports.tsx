import { Button, Layout, LegacyCard, LegacyStack, TextStyle } from "@shopify/polaris";
import { List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AlertPop, Sessioncheker } from "../../../../Global/Alert";
import CustomizeModal from "../../Packages/Components/CustomizeModal";

function Sports(props: any) {
    const [sportsdata, setsportsdata] = useState<any>([]);
    const [open, setopen] = useState<boolean>(false);
    const [label, setlabel] = useState<any>();
    const [value, setvalue] = useState<any>();
    const [islands, setisland] = useState<any>();
    const [beach, setbeach] = useState<any>();
    const [refresh, setrefresh] = useState<any>();

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
    }, [refresh])

    function addsport() {
        setrefresh(true);
        const sports = {
            method: "post",
            url: process.env.REACT_APP_SHOP_NAME + "/api/addsport",
            withCredentials: true,
            credentials: 'include',
            data: {
                label: label,
                value: value,
                island: islands,
                Beach: beach
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(sports).then((res) => {
            Sessioncheker(res)
            setrefresh(false);
            setloadings(false);
            setlabel('');
            setvalue('');
        }).catch((err) => {
            setrefresh(false);
            AlertPop("Error", err.toString(), "error");
        })
    }

    function deletesport(id: any) {
        setrefresh(true);
        const sports = {
            method: "delete",
            url: process.env.REACT_APP_SHOP_NAME + "/api/removesport/" + id,
            withCredentials: true,
            credentials: 'include',
            data: {
                label: label,
                value: value
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(sports).then((res) => {
            Sessioncheker(res)
            setrefresh(false);
            setloadings(false);
            setlabel('');
            setvalue('');
        }).catch((err) => {
            setrefresh(false);
            AlertPop("Error", err.toString(), "error");
        })
    }
    return (
        <>
            <Layout.AnnotatedSection
                title="Sports"
                description={
                    <LegacyStack spacing="tight">
                        <TextStyle>want to customize the Sports list </TextStyle>
                        <Button plain onClick={() => setopen(true)}>Click here</Button>
                    </LegacyStack>
                }>
                <LegacyCard.Section>
                    <List
                        header={<TextStyle variation="strong">Sports</TextStyle>}
                        loading={loading}
                        bordered>
                        {sportsdata.map((item: any, index: number) => {
                            return (
                                <List.Item >{item.label}</List.Item>
                            )
                        })}
                    </List>
                </LegacyCard.Section>
            </Layout.AnnotatedSection>
            <CustomizeModal
                beaches={props.beach}
                setbeach={setbeach}
                islands={props.islands}
                setisland={setisland}
                loading={loading}
                open={open}
                onClose={setopen}
                data={sportsdata}
                label={label}
                value={value}
                setlabel={setlabel}
                onAdd={addsport}
                onRemove={(e: any) => deletesport(e)}
                setvalue={setvalue} />
        </>
    )
}

export default Sports;