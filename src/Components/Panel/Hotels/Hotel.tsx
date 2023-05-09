import { Button, Card, Icon, Page, Stack } from "@shopify/polaris";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop } from "../../../Global/Alert";
import { StatusActiveMajor } from '@shopify/polaris-icons';

function Hotels() {
    const history = useNavigate();
    const [loading, setLoading] = useState<boolean>();
    const [data, setdata] = useState();
    const [deleted, setdelet] = useState();


    const deleteHotel = (record: any) => {
        const config = {
            method: "delete",
            url: process.env.REACT_APP_SHOP_NAME + "/api/removehotel/" + record.id,
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            if (res.data.status) {
                AlertPop("Updated", "Sucessfuly deleted", "success");
                setdelet(res.data.status)

            }
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    useEffect(() => {
        setLoading(true)
        const config = {
            method: "get",
            url: "http://localhost:3001/api/gethotels",
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            const ar: any = [];
            res.data.data.forEach((item: any) => {
                ar.push({
                    id: item.id,
                    createdAt: item.createdAt,
                    hotel_name: item.hotel_name,
                    description: item.description,
                    single: item.single,
                    double: item.double,
                    location: item.location,
                    rating: item.rating,
                    images: item.images
                })
            })
            setdata(ar)
            setLoading(false)
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }, [deleted])

    // const rows = [
    //     {
    //         hotel_name: "dadasd",
    //         description: "fdsfdsfsd dfsdf ds f dsf ds f sdfdsfdsg fgfdsfdsfsd fdsfdsfsdv fdsfdsfsd dsdkjshdhs fdsfdsfsd fdsfdsfsd dfsdf ds f dsf ds f sdfdsfdsg fgfdsfdsfsd fdsfdsfsdv fdsfdsfsd dsdkjshdhs fdsfdsfsd fdsfdsfsd dfsdf ds f dsf ds f sdfdsfdsg fgfdsfdsfsd fdsfdsfsdv fdsfdsfsd dsdkjshdhs fdsfdsfsd",
    //         single: "--",
    //         double: "Yes",
    //         location: "fdsfds",
    //         rating: 4.5

    //     }
    // ]
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 150
        },
        {
            title: 'Hotel Name',
            dataIndex: 'hotel_name',
            key: 'name',
            width: 150
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 550
        },
        {
            title: 'Date',
            dataIndex: "createdAt",
            key: 'createdAt',
            width: 250
        },
        {
            title: 'Single',
            dataIndex: "single",
            key: 'single',
            width: 150,
            render: (_: any, record: any | object) => (
                <Stack>
                    {record.single ? <Icon
                        source={StatusActiveMajor}
                        color="success"
                    /> :
                        <Icon
                            source={StatusActiveMajor}
                            color="subdued"
                        />}
                </Stack>
            )
        },
        {
            title: 'Double',
            dataIndex: "double",
            key: 'double',
            width: 150,
            render: (_: any, record: any | object) => (
                <Stack>
                    {record.double ? <Icon
                        source={StatusActiveMajor}
                        color="success"
                    /> :
                        <Icon
                            source={StatusActiveMajor}
                            color="subdued"
                        />}
                </Stack>
            )
        },
        {
            title: 'Loaction',
            dataIndex: "location",
            key: 'location',
            width: 250
        },
        {
            title: 'Rating',
            dataIndex: "rating",
            key: 'rating',
            width: 150
        },
        {
            title: 'Action',
            key: 'action',
            width: 250,
            render: (_: any, record: any | object) => (
                <Stack>
                    <Button
                        onClick={() => { history("edithotel", { state: record }) }}
                        plain>Edit</Button>
                    <span>|</span>
                    <Button plain
                        onClick={() => deleteHotel(record)}>
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    return (
        <>
            <Page
                title="Hotels"
                fullWidth>
                <Card sectioned>
                    <Stack vertical wrap={false}>
                        <Button
                            outline
                            onClick={() => history('addhotel')}>
                            Add Hotel
                        </Button>
                        <Table scroll={{ x: 1400 }} loading={loading} columns={columns} dataSource={data} />
                    </Stack>
                </Card>
            </Page>
        </>
    )
}

export default Hotels;