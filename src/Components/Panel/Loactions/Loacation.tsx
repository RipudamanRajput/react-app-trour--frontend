import { Button, Card, Page, Stack, TextStyle } from "@shopify/polaris";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop, Sessioncheker } from "../../../Global/Alert";
import { EditMinor, DeleteMinor } from '@shopify/polaris-icons';

function Loaction() {
    const history = useNavigate();
    const [data, setdata] = useState();
    const [loading, setLoading] = useState<boolean>();
    const [deleted, setdelet] = useState();

    useEffect(() => {
        setLoading(true)
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getloactions",
            withCredentials: true,
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
                    coordinates: item.coordinates,
                    createdAt: item.createdAt,
                    description: item.description,
                    id: item.id,
                    location_name: item.location_name,
                    active: item.active
                })
            })
            setdata(ar)
            setLoading(false)
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }, [deleted])

    const deleteLocation = (record: any) => {
        setLoading(true)
        const config = {
            method: "delete",
            url: process.env.REACT_APP_SHOP_NAME + "/api/removeloaction/" + record.id,
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res)
            if (res.data.status) {
                AlertPop("Deleted", res.data.status, "success");
                setdelet(res.data.status)
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            AlertPop("Error", err.toString(), "error");
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 150
        },
        {
            title: 'Name',
            dataIndex: 'location_name',
            key: 'name',
            width: 150
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     width: 550
        // },
        {
            title: 'Coordinates',
            key: 'coordinates',
            dataIndex: 'coordinates',
            width: 350,
            render: (_: any, record: any | object) => (
                <Stack vertical spacing="extraTight">
                    <Stack>
                        <TextStyle variation="strong">Longitude:</TextStyle>
                        <TextStyle variation="subdued">{record.coordinates[0].longitude}</TextStyle>
                    </Stack>
                    <Stack>
                        <TextStyle variation="strong">Latitude:</TextStyle>
                        <TextStyle variation="subdued">{record.coordinates[0].latitude}</TextStyle>\
                    </Stack>
                </Stack>
            ),

        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 350
        },
        {
            title: 'Action',
            key: 'action',
            width: 250,
            render: (_: any, record: any | object) => (
                <Stack spacing="extraTight">
                    <Button
                        onClick={() => { history("editlocation", { state: record }) }}
                        icon={EditMinor}
                    />
                    <Button
                        outline
                        destructive
                        icon={DeleteMinor}
                        onClick={() => deleteLocation(record)} />
                </Stack>
            ),
        },
    ];
    return (
        <Page fullWidth title="Locations">
            <Card sectioned >
                <Stack wrap={false} vertical>
                    <Stack>
                        <Button
                            disabled={loading}
                            onClick={() => history("addlocation")}
                            outline>
                            Add Loaction
                        </Button>
                    </Stack>
                    <Table scroll={{ x: 1300 }} loading={loading} columns={columns} dataSource={data} />
                </Stack>
            </Card>
        </Page>
    )
}

export default Loaction;