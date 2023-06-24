// import { LegacyCard, Page } from "@shopify/polaris";
// import React, { useEffect, useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import axios from "axios";
// import { AlertPop, Sessioncheker } from "../../../../Global/Alert";
// import { useLocation } from "react-router-dom";


// function Editpost() {
//     const { state } = useLocation();
//     const { id } = state
//     const [editorState, seteditorState] = useState<any>();

//     function blockstoobject(data: any) {
//         function dataobj(info: any) {
//             if (info.textAlign) {
//                 return ({
//                     'text-align': info.textAlign
//                 })
//             } else {
//                 return {}
//             }
//         }
//         if (data) {
//             const ar: any = [];
//             data.forEach((ele: any) => {
//                 ar.push({
//                     key: ele.key,
//                     text: ele.text,
//                     type: ele.type,
//                     depth: ele.depth,
//                     inlineStyleRanges: ele.inlineStyleRanges,
//                     entityRanges: ele.entityRanges,
//                     data: dataobj(ele.data)
//                 })
//             });
//             return ar
//         } else {
//             return []
//         }
//     }

//     function entityMaptoObject(data: any) {
//         function enitydata(name: any, data: any) {
//             switch (name) {
//                 case "LINK":
//                     return {
//                         url: data.url,
//                         targetOption: data.targetOption
//                     }
//                 case "EMBEDDED_LINK":
//                     return {
//                         src: data.src,
//                         height: data.height,
//                         width: data.width
//                     }
//                 default: {
//                     return {
//                         src: data.src,
//                         height: data.height,
//                         width: data.width,
//                         alignment: data.alignment
//                     }
//                 }
//             }
//         }

//         const ar: any = [];
//         if (data) {
//             Object.keys(data)?.forEach((_: any, index: number) => {
//                 ar.push({
//                     type: data[index].type,
//                     mutability: data[index].mutability,
//                     data: enitydata(data[index].type, data[index].data?.[0])
//                 })
//             });
//             return { ...ar };
//         } else {
//             return {}
//         }
//     }

//     useEffect(() => {
//         const config = {
//             method: "get",
//             url: process.env.REACT_APP_SHOP_NAME + "/api/getpost/" + id,
//             withCredentials: true,
//             credentials: 'include',
//             headers: {
//                 'Authorization': process.env.REACT_APP_TOKEN || '',
//                 'Content-Type': 'application/json'
//             }
//         };
//         axios(config).then((res) => {
//             Sessioncheker(res)
//             const data = {
//                 blocks: blockstoobject(res.data.data.blocks),
//                 entityMap: entityMaptoObject(res.data.data.entityMap)
//             }
//             seteditorState(data)
//         }).catch((err) => {
//             AlertPop("Error", err.toString(), "error");
//         })
//     }, [])

//     function Blocktoobject(data: any) {
//         function Datatoobject(info: any) {
//             if (info?.['text-align']) {
//                 return [{ textAlign: info?.['text-align'] }]
//             } else {
//                 return {}
//             }
//         }
//         const ar: any = [];
//         if (data) {
//             Object.keys(data)?.forEach((_: any, index: number) => {
//                 ar.push({
//                     key: data[index].key,
//                     text: data[index].text,
//                     type: data[index].type,
//                     depth: data[index].depth,
//                     inlineStyleRanges: data[index].inlineStyleRanges,
//                     entityRanges: data[index].entityRanges,
//                     data: Datatoobject(data[index].data)
//                 })
//             })
//             return ar;
//         }
//     }

//     function entitymaytoObject(data: any) {
//         function enitydata(name: any, data: any) {
//             switch (name) {
//                 case "LINK":
//                     return {
//                         url: data.url,
//                         targetOption: data.targetOption
//                     }
//                 case "EMBEDDED_LINK":
//                     return {
//                         src: data.src,
//                         height: data.height,
//                         width: data.width
//                     }
//                 default: {
//                     return {
//                         src: data.src,
//                         height: data.height,
//                         width: data.width,
//                         alignment: data.alignment
//                     }
//                 }
//             }
//         }
//         const ar: any = [];
//         if (data) {
//             Object.keys(data)?.forEach((_: any, index: number) => {
//                 ar.push({
//                     type: data[index].type,
//                     mutability: data[index].mutability,
//                     data: enitydata(data[index].type, data[index].data)
//                 })
//             });
//             return ar;
//         } else {
//             return {}
//         }
//     }



//     function Addpost() {
//         const config = {
//             method: "put",
//             url: process.env.REACT_APP_SHOP_NAME + "/api/updatepost/" + id,
//             withCredentials: true,
//             credentials: 'include',
//             data: {
//                 blocks: Blocktoobject(editorState?.blocks),
//                 entityMap: entitymaytoObject(editorState?.entityMap)
//             },
//             headers: {
//                 'Authorization': process.env.REACT_APP_TOKEN || '',
//                 'Content-Type': 'application/json'
//             }
//         };
//         axios(config).then((res) => {
//             Sessioncheker(res)

//         }).catch((err) => {
//             AlertPop("Error", err.toString(), "error");
//         })
//     }
//     return (
//         <Page
//             title="Edit Post"
//             primaryAction={{
//                 content: "Save",
//                 onAction: () => Addpost()
//             }}>
//             <LegacyCard sectioned>
//                 <Editor
//                     contentState={editorState}
//                     spellCheck
//                     placeholder="Enter your text here:"
//                     toolbarClassName="toolbarClassName"
//                     wrapperClassName="wrapperClassName"
//                     editorClassName="editorClassName"
//                     onChange={(w: any) => seteditorState(w)}
//                 />
//             </LegacyCard>
//         </Page>
//     );
// }
// export default Editpost;