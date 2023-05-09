import { Button, Card, Page, Stack } from "@shopify/polaris";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop } from "../../../Global/Alert";

function Package() {
    const history = useNavigate();
    const [data, setdata] = useState();
    const [loading, setLoading] = useState<boolean>();
    const [deleted, setdelet] = useState();

    useEffect(() => {
        setLoading(true)
        const config = {
            method: "get",
            url: "http://localhost:3001/api/getpackages",
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
                    package_name: item.package_name,
                    description: item.description,
                    hotel: item.hotel,
                    location: item.location,
                    cost: item.cost
                })
            })
            setdata(ar)
            setLoading(false)
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }, [deleted])

    const deletePackage = (record: any) => {
        const config = {
            method: "delete",
            url: "http://localhost:3001/api/removepackage/" + record.id,
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            if (res.data.status) {
                AlertPop("Deleted", res.data.status, "success");
                setdelet(res.data.status)
            }
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 150
        },
        {
            title: 'package Name',
            dataIndex: 'package_name',
            key: 'name',
            width: 150
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 650
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            width: 250
        },
        {
            title: 'Loaction',
            dataIndex: "location",
            key: 'location',
            width: 250
        },
        {
            title: 'Hotel',
            dataIndex: "hotel",
            key: 'hotel',
            width: 150
        },
        {
            title: 'Cost',
            dataIndex: "cost",
            key: 'cost',
            width: 150
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_: any, record: any | object) => (
                <Stack>
                    <Button
                        onClick={() => { history("editpackage", { state: record }) }}
                        plain>Edit</Button>
                    <span>|</span>
                    <Button plain
                        onClick={() => deletePackage(record)}>Delete</Button>
                </Stack>
            ),
        },
    ];
    return (
        <Page
            fullWidth
            title="Package">
            <Card sectioned>
                <Stack wrap={false} vertical>
                    <Button
                        outline
                        onClick={() => history('addpackage')}>
                        Add Package
                    </Button>
                    <Table scroll={{x:1200}} loading={loading} columns={columns} dataSource={data} />
                </Stack>
            </Card>
        </Page>
    )
}
export default Package;