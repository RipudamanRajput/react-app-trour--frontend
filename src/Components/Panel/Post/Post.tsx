import { Button, LegacyCard, Page, Stack, TextStyle } from "@shopify/polaris";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop, Sessioncheker } from "../../../Global/Alert";
import axios from "axios";

function Post() {
    const [rows, setrows] = useState<any>()
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTRkYjBlMGU5OGNlNDg2YzdlOGJjYyIsInVzZXJuYW1lIjoicmlwdSIsImlhdCI6MTY4NjU2MTQ1M30.DYAk2k0LPh3pc89kmZC-foqje0DzyfIC6N93TwBw2JE");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "full_name=UserName%20LastName; sid=9e58e93183265c0bcf2eb03e942c2b3e6b64547f44de9bd35cdf6be2; system_user=yes; user_id=user%40example.com; user_image=");

        var raw = JSON.stringify({
            "usr": "user@example.com",
            "pwd": "cpYrg4/6.p0i"
        });

        const requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            mode: "cors", // same-origin, no-cors
            credentials: "same-origin", // omit, include
            cache: "default",
            body: raw,
            redirect: 'follow'
        };

        fetch("http://20.163.238.153/api/method/login", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }, [])
    // useEffect(() => {
    //     const config = {
    //         method: "get",
    //         url: process.env.REACT_APP_SHOP_NAME + "/api/getposts",
    //         withCredentials: true,
    //         credentials: 'include',
    //         data: data,
    //         headers: {
    //             'Authorization': process.env.REACT_APP_TOKEN || '',
    //             'Content-Type': 'application/json'
    //         }
    //     };
    //     axios(config).then((res) => {
    //         Sessioncheker(res)
    //         const ar: any = [];
    //         res.data.data.forEach((item: any, index: number) => {
    //             ar.push({
    //                 id: item.id,
    //                 post_name: item.blocks[0].text,
    //                 createdAt: item.createdAt
    //             })
    //             console.log(item, "dadasd")

    //         })
    //         setrows(ar)
    //     }).catch((err) => {
    //         AlertPop("Error", err.toString(), "error");
    //     })
    // }, [])
    const history = useNavigate();
    const data = [
        {
            id: "asdsad",
            post_name: "sadasda",
            createdAt: "DAsdasd"
        }
    ]
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 250
        },
        {
            title: 'Name',
            dataIndex: 'post_name',
            key: 'name',
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
                <Button
                    children="Edit"
                    onClick={() => history("editpost", { state: record })} />
            ),
        },
    ];
    return (
        <Page
            title="Post"
            fullWidth
            primaryAction={{
                content: "Add Post",
                onAction: () => history("addpost")

            }}>
            <LegacyCard sectioned>
                <Table columns={columns} dataSource={rows} />
            </LegacyCard>
        </Page>
    );
}

export default Post;