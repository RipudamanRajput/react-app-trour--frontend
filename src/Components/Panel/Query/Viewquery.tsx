import { FormLayout, Layout, LegacyCard, Loading, Page, TextField, TextStyle } from "@shopify/polaris";
import { List } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AlertPop, Sessioncheker } from "../../../Global/Alert";
import axios from "axios";

function Viewquery() {
    const { state } = useLocation();
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState<any>([]);
    useEffect(() => {
        setloading(true);
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getmytrip/" + state.id,
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res)
            setdata({
                id: res.data.data.id,
                Create_date: res.data.data.createdAt,
                email: res.data.data.email,
                phone: res.data.data.phone_number,
                date: res.data.data.date,
                No_of_Days: res.data.data.number_of_days,
                adult: res.data.data.adults,
                big_childs: res.data.data.big_childs,
                small_childs: res.data.data.small_childs,
                hotel_type: res.data.data.hotel_type,
                ac_non_Ac: res.data.data.ac_non_Ac,
                No_of_Rooms: res.data.data.No_of_Rooms,
                water_sports: res.data.data.water_sports,
                islands: res.data.data.islands,
                beaches: res.data.data.beaches
            })
            setloading(false);
        }).catch((err) => {
            setloading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [])
    return (
        <>
            {loading ? <Loading /> :
                <Page title="View Query" fullWidth>
                    <Layout>
                        <Layout.AnnotatedSection
                            id="userDetails"
                            title="Basic Details"
                            description="Basic Details about the customer "
                        >
                            <LegacyCard sectioned>
                                <FormLayout>
                                    <FormLayout.Group >
                                        <TextField
                                            label="Created Date"
                                            autoComplete="off"
                                            readOnly
                                            value={data.Create_date}
                                        />
                                        <TextField
                                            label="User email"
                                            autoComplete="off"
                                            readOnly
                                            value={data.email}
                                        />
                                        <TextField
                                            label="User Phone"
                                            autoComplete="off"
                                            readOnly
                                            value={data.phone}
                                        />


                                        <TextField
                                            label="Date"
                                            autoComplete="off"
                                            readOnly
                                            value={data.date}
                                        />
                                        <TextField
                                            label="No. of Days"
                                            autoComplete="off"
                                            readOnly
                                            value={data.No_of_Days}
                                        />
                                        <TextField
                                            label="Adults(12+)"
                                            autoComplete="off"
                                            readOnly
                                            value={data.adult}
                                        />
                                        <TextField
                                            label="Child(5-12)"
                                            autoComplete="off"
                                            readOnly
                                            value={data.big_childs}
                                        />
                                        <TextField
                                            label="Child(0-5)"
                                            autoComplete="off"
                                            readOnly
                                            value={data.small_childs}
                                        />
                                    </FormLayout.Group>
                                </FormLayout>
                            </LegacyCard>
                        </Layout.AnnotatedSection>

                        <Layout.AnnotatedSection
                            id="hotelDetails"
                            title="Hotel Details"
                            description="Hotel Details by the customer "
                        >
                            <LegacyCard sectioned>
                                <FormLayout>
                                    <FormLayout.Group >
                                        <TextField
                                            label="Hotel Type"
                                            autoComplete="off"
                                            readOnly
                                            value={data.hotel_type}
                                        />
                                        <TextField
                                            label="AC/Non-Ac"
                                            autoComplete="off"
                                            readOnly
                                            value={data.ac_non_Ac}
                                        />
                                        <TextField
                                            label="No. of Rooms"
                                            autoComplete="off"
                                            readOnly
                                            value={data.No_of_Rooms}
                                        />
                                    </FormLayout.Group>
                                </FormLayout>
                            </LegacyCard>
                        </Layout.AnnotatedSection>

                        <Layout.AnnotatedSection
                            id="sportDetails"
                            title="Activity Details"
                            description="Activity Details by the customer "
                        >
                            <LegacyCard sectioned>
                                <FormLayout>
                                    <FormLayout.Group >
                                        <List
                                            header={<TextStyle variation="strong">Water Sports</TextStyle>}
                                            bordered >
                                            {data.water_sports?.map((item: any, index: number) => {
                                                return <List.Item key={index}>{item.label}</List.Item>

                                            })}
                                        </List>
                                        <List
                                            header={<TextStyle variation="strong">Islands</TextStyle>}
                                            bordered >
                                            {data.islands?.map((item: any, index: number) => {
                                                return <List.Item key={index}>{item.label}</List.Item>

                                            })}
                                        </List>
                                        <List
                                            header={<TextStyle variation="strong">Beaches</TextStyle>}
                                            bordered >
                                            {data.beaches?.map((item: any, index: number) => {
                                                return <List.Item key={index}>{item.label}</List.Item>

                                            })}
                                        </List>
                                    </FormLayout.Group>
                                </FormLayout>
                            </LegacyCard>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Page>
            }
        </>
    )
}

export default Viewquery;