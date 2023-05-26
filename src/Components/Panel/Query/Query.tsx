import { Button, Card, Icon, Loading, Page, Stack } from "@shopify/polaris";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop, Sessioncheker } from "../../../Global/Alert";

function Queries() {
    const history = useNavigate();
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState<any>([]);
    useEffect(() => {
        setloading(true);
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getmytrips",
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
                    id: item.id,
                    Create_date: item.createdAt,
                    email: item.email,
                    phone: item.phone_number,
                    date: item.date,
                    No_of_Days: item.number_of_days
                })
            })
            setdata(ar)
            setloading(false);
        }).catch((err) => {
            setloading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [])

   
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 150
        },
        {
            title: 'Create Date',
            dataIndex: 'Create_date',
            key: 'Create_date',
            width: 150
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250
        },
        {
            title: 'Phone',
            dataIndex: "phone",
            key: 'phone',
            width: 250
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150
        },
        {
            title: 'No. Od Days',
            dataIndex: 'No_of_Days',
            key: 'No_of_Days',
            width: 150
        },
        {
            title: 'Action',
            key: 'action',
            width: 250,
            render: (_: any, record: any | object) => (
                <Stack>
                    <Button
                        onClick={() => { history("Viewquery", { state: record }) }}
                        plain>View</Button>
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
            {loading ? <Loading /> :
                <Page
                    title="Queries"
                    fullWidth>
                    <Card sectioned>
                        <Stack vertical>
                            {/* <Button
                            outline
                            onClick={() => history('addhotel')}>
                            Add Hotel
                        </Button> */}
                            <Table scroll={{ x: 1400 }} columns={columns} dataSource={data} />
                        </Stack>
                    </Card>
                </Page>
            }
        </>
    )
}

export default Queries;