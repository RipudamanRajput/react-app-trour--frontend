import { Button, Layout, LegacyCard, LegacyStack, TextStyle } from "@shopify/polaris";
import { List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AlertPop, Sessioncheker } from "../../../../Global/Alert";
import CustomizeModal from "../../Packages/Components/CustomizeModal";

function Islands(props: any) {
    const [islandsdata, setislandsdata] = useState<any>([]);
    const [open, setopen] = useState<boolean>(false);
    const [label, setlabel] = useState<any>();
    const [value, setvalue] = useState<any>();
    const [refresh, setrefresh] = useState<any>();

    const [loading, setloadings] = useState(false);
    useEffect(() => {
        setloadings(true);
        const sports = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getislandss",
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
            setislandsdata(ar)
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
            url: process.env.REACT_APP_SHOP_NAME + "/api/addislands",
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
        }).catch((err) => {
            setrefresh(false);
            AlertPop("Error", err.toString(), "error");
        })
    }

    function deletesport(id: any) {
        setrefresh(true);
        const sports = {
            method: "delete",
            url: process.env.REACT_APP_SHOP_NAME + "/api/removeislands/" + id,
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
        }).catch((err) => {
            setrefresh(false);
            AlertPop("Error", err.toString(), "error");
        })
    }
    return (
        <>
            <Layout.AnnotatedSection
                title="Islands"
                description={
                    <LegacyStack spacing="tight">
                        <TextStyle>want to customize the Islands list </TextStyle>
                        <Button plain onClick={() => setopen(true)}>Click here</Button>
                    </LegacyStack>
                }>
                <LegacyCard.Section>
                    <List
                        header={<TextStyle variation="strong">Islands</TextStyle>}
                        bordered>
                        {islandsdata.map((item: any, index: number) => {
                            return (
                                <List.Item >{item.label}</List.Item>
                            )
                        })}
                    </List>
                </LegacyCard.Section>
            </Layout.AnnotatedSection>
            <CustomizeModal
                open={open}
                onClose={setopen}
                data={islandsdata}
                label={label}
                value={value}
                setlabel={setlabel}
                onAdd={addsport}
                onRemove={(e: any) => deletesport(e)}
                setvalue={setvalue} />
        </>
    )
}

export default Islands;