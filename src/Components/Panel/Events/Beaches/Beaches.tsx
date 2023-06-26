import { Button, Layout, LegacyCard, LegacyStack, TextStyle } from "@shopify/polaris";
import { List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AlertPop, Sessioncheker } from "../../../../Global/Alert";
import CustomizeModal from "../../Packages/Components/Components/CustomizeModal";

function Beaches(props: any) {
    const [isbeachesdata, setisbeachesdata] = useState<any>([]);
    const [open, setopen] = useState<boolean>(false);
    const [label, setlabel] = useState<any>();
    const [value, setvalue] = useState<any>();
    const [Islands, setIsland] = useState();
    const [refresh, setrefresh] = useState<any>();
    const [loading, setloadings] = useState(false);
    useEffect(() => {
        setloadings(true);
        const sports = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getbeaches",
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
                Islands ?
                    Islands === item.island &&
                    ar.push({
                        id: item.id,
                        label: item.label,
                        value: item.value,
                        island: item.island
                    })
                    :
                    ar.push({
                        id: item.id,
                        label: item.label,
                        value: item.value,
                        island: item.island
                    })
            })
            setisbeachesdata(ar)
            props.setbeach(ar)
            setloadings(false);
        }).catch((err) => {
            setloadings(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [refresh, Islands])

    function addsport() {
        setrefresh(true);
        const sports = {
            method: "post",
            url: process.env.REACT_APP_SHOP_NAME + "/api/addbeache",
            withCredentials: true,
            credentials: 'include',
            data: {
                label: label,
                value: value,
                island: Islands
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
            url: process.env.REACT_APP_SHOP_NAME + "/api/removebeache/" + id,
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
                title="Beaches"
                description={
                    <LegacyStack spacing="tight">
                        <TextStyle>want to customize the Beaches list </TextStyle>
                        <Button plain onClick={() => setopen(true)}>Click here</Button>
                    </LegacyStack>
                }>
                <LegacyCard.Section>
                    <List
                        header={<TextStyle variation="strong">Beaches</TextStyle>}
                        loading={loading}
                        bordered>
                        {isbeachesdata.map((item: any, index: number) => {
                            return (
                                <List.Item >{item.label}</List.Item>
                            )
                        })}
                    </List>
                </LegacyCard.Section>
            </Layout.AnnotatedSection>
            <CustomizeModal
                setisland={setIsland}
                islands={Islands}
                islandsOptions={props.islands}
                open={open}
                loading={loading}
                onClose={setopen}
                data={isbeachesdata}
                label={label}
                value={value}
                setlabel={setlabel}
                onAdd={addsport}
                onRemove={(e: any) => deletesport(e)}
                setvalue={setvalue} />
        </>
    )
}

export default Beaches;