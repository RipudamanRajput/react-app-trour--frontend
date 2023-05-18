import { Button, Card, Page, Stack } from "@shopify/polaris";
import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop, Sessioncheker } from "../../../Global/Alert";
import { EditMinor, DeleteMinor } from '@shopify/polaris-icons';

function Package() {
    const history = useNavigate();
    const [data, setdata] = useState();
    const [loading, setLoading] = useState<boolean>();
    const [deleted, setdelet] = useState();

    useEffect(() => {
        setLoading(true)
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getpackages",
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
                    id: item.id,
                    createdAt: item.createdAt,
                    title: item.title,
                    package_type: item.package_type,
                    duration: item.duration,
                    price: item.price,
                })
            })
            setdata(ar)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            AlertPop("Error", err.toString(), "error");
        })
    }, [deleted])

    const deletePackage = (record: any) => {
        setLoading(true)
        const config = {
            method: "delete",
            url: process.env.REACT_APP_SHOP_NAME + "/api/removepackage/" + record.id,
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
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 150
        },
        {
            title: 'package Name',
            dataIndex: 'title',
            key: 'title',
            width: 150
        },
        {
            title: 'package Type',
            dataIndex: 'package_type',
            key: 'package_type',
            width: 150
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            width: 250
        },
        {
            title: 'Duration',
            dataIndex: "duration",
            key: 'duration',
            width: 150
        },
        {
            title: 'Price',
            dataIndex: "price",
            key: 'price',
            width: 150
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_: any, record: any | object) => (
                <Stack spacing="extraTight">
                    <Button
                        onClick={() => { history("editpackage", { state: record }) }}
                        icon={EditMinor} />
                    <Button
                        outline
                        destructive
                        icon={DeleteMinor}
                        onClick={() => deletePackage(record)} />
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
                        disabled={loading}
                        outline
                        onClick={() => history('addpackage')}>
                        Add Package
                    </Button>
                    <Table scroll={{ x: 1300 }} loading={loading} columns={columns} dataSource={data} />
                </Stack>
            </Card>
        </Page>
    )
}
export default Package;