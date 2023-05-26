import { LegacyCard, LegacyStack, Loading,  Page, Thumbnail } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AlertPop, Sessioncheker } from "../../../Global/Alert";
import Mediamoadl from "./Mediamoadl";

function Mediapage() {
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState<any>([]);
    useEffect(() => {
        setloading(true);
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/media/getimages",
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res)
            const ar: any = [];
            res.data.data.forEach((item: any) => {
                ar.push({
                    name: item.name,
                    src: item.src
                })
            })
            setdata(ar)
            setloading(false);
        }).catch((err) => {
            setloading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [])
    return (
        <>
            {loading ? <Loading /> :
                <Page title=" Server Files ">
                    <LegacyCard title="Images">
                        <LegacyCard.Section>
                            <LegacyStack>
                                {data.map((item: any, index: number) => {
                                    return (
                                        <LegacyStack vertical spacing="tight">
                                            <Thumbnail size="large" source={item.src} alt={item.name} />
                                            <Mediamoadl
                                                src={item.src}
                                                name={item.name}
                                            />
                                        </LegacyStack>
                                    )
                                })}

                            </LegacyStack>
                        </LegacyCard.Section>

                    </LegacyCard>

                </Page>
            }
        </>
    )
}
export default Mediapage;