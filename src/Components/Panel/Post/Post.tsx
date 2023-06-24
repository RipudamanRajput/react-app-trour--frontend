// import { Button, LegacyCard, Page, Stack, TextStyle } from "@shopify/polaris";
// import { Table } from "antd";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AlertPop, Sessioncheker } from "../../../Global/Alert";
// import axios from "axios";

// function Post() {
//     const [rows, setrows] = useState<any>()

//     useEffect(() => {
//         const config = {
//             method: "get",
//             url: process.env.REACT_APP_SHOP_NAME + "/api/getposts",
//             withCredentials: true,
//             credentials: 'include',
//             data: data,
//             headers: {
//                 'Authorization': process.env.REACT_APP_TOKEN || '',
//                 'Content-Type': 'application/json'
//             }
//         };
//         axios(config).then((res) => {
//             Sessioncheker(res)
//             const ar: any = [];
//             res.data.data.forEach((item: any, index: number) => {
//                 ar.push({
//                     id: item.id,
//                     post_name: item.blocks[0].text,
//                     createdAt: item.createdAt
//                 })
//                 console.log(item, "dadasd")

//             })
//             setrows(ar)
//         }).catch((err) => {
//             AlertPop("Error", err.toString(), "error");
//         })
//     }, [])
//     const history = useNavigate();
//     const data = [
//         {
//             id: "asdsad",
//             post_name: "sadasda",
//             createdAt: "DAsdasd"
//         }
//     ]
//     const columns = [
//         {
//             title: 'ID',
//             dataIndex: 'id',
//             key: 'id',
//             width: 250
//         },
//         {
//             title: 'Name',
//             dataIndex: 'post_name',
//             key: 'name',
//         },
//         {
//             title: 'Date',
//             dataIndex: 'createdAt',
//             key: 'createdAt',
//             width: 350
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             width: 250,
//             render: (_: any, record: any | object) => (
//                 <Button
//                     children="Edit"
//                     onClick={() => history("editpost", { state: record })} />
//             ),
//         },
//     ];
//     return (
//         <Page
//             title="Post"
//             fullWidth
//             primaryAction={{
//                 content: "Add Post",
//                 onAction: () => history("addpost")

//             }}>
//             <LegacyCard sectioned>
//                 <Table columns={columns} dataSource={rows} />
//             </LegacyCard>
//         </Page>
//     );
// }

// export default Post;