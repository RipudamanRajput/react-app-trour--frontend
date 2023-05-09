import { Button, Card, Icon, Page, Stack } from "@shopify/polaris";
import { Table } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusActiveMajor } from '@shopify/polaris-icons';

function Bookings() {
    const history = useNavigate();
    

    const rows = [
        {
            hotel_name: "dadasd",
            description: "fdsfdsfsd dfsdf ds f dsf ds f sdfdsfdsg fgfdsfdsfsd fdsfdsfsdv fdsfdsfsd dsdkjshdhs fdsfdsfsd fdsfdsfsd dfsdf ds f dsf ds f sdfdsfdsg fgfdsfdsfsd fdsfdsfsdv fdsfdsfsd dsdkjshdhs fdsfdsfsd fdsfdsfsd dfsdf ds f dsf ds f sdfdsfdsg fgfdsfdsfsd fdsfdsfsdv fdsfdsfsd dsdkjshdhs fdsfdsfsd",
            single: "--",
            double: "Yes",
            location: "fdsfds",
            rating: 4.5

        }
    ]
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
                    <Button plain>
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];
    return (
        <>
            <Page
                title="Bookings"
                fullWidth>
                <Card sectioned>
                    <Stack vertical>
                        {/* <Button
                            outline
                            onClick={() => history('addhotel')}>
                            Add Hotel
                        </Button> */}
                        <Table scroll={{ x: 1400 }} columns={columns} dataSource={rows} />
                    </Stack>
                </Card>
            </Page>
        </>
    )
}

export default Bookings;