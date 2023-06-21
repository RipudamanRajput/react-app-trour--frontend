import { DropZone, LegacyCard, LegacyStack, Loading, Page, Thumbnail } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AlertPop, Sessioncheker } from "../../../Global/Alert";
import Mediamoadl from "./Mediamoadl";

function Mediapage() {
    const [loading, setloading] = useState(false);
    const [refresh, setrefesh] = useState<boolean>(false)
    const [data, setdata] = useState<any>([]);
    const [images, setimages] = useState<any>([])

    var formdata = new FormData();
    images.forEach((item: any, index: number) => {
        formdata.append('image', item, item.name);
    })

    useEffect(() => {
        setloading(true);
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/media/getimages",
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
                    name: item.name,
                    src: item.src
                })
            })
            setdata(ar)
            setloading(false);
        }).catch((err) => {
            setloading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [refresh])

    function addmedia() {
        setrefesh(true);
        const config = {
            method: "post",
            url: process.env.REACT_APP_SHOP_NAME + "/media/addimage",
            withCredentials: true,
            credentials: 'include',
            data: formdata,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        (images.length > 0) ?
            axios(config).then((res) => {
                Sessioncheker(res)
                setrefesh(false);
                setimages([])
            }).catch((err) => {
                setrefesh(false);
                AlertPop("Error", err.toString(), "error");
            })
            :
            setrefesh(false);

    }
    return (
        <>
            {loading ? <Loading /> :
                <Page
                    title=" Server Files "
                    primaryAction={
                        {
                            content: "Add Images",
                            disabled: images.length > 0 ? false : true,
                            onAction: () => addmedia(),
                            loading: refresh
                        }
                    }>
                    <LegacyCard title="Images">
                        <LegacyCard.Section>
                            <LegacyStack>
                                {images.length > 0 &&
                                    <Thumbnail size="large" source={URL.createObjectURL(images?.[0])} alt={""} />
                                }
                                <div style={{ width: "50px" }}>
                                    <DropZone
                                        type="image"
                                        allowMultiple={false}
                                        onDrop={(_dropFile, acceptFiles: File[]) => {
                                            setimages(_dropFile)
                                        }}>

                                        <DropZone.FileUpload actionTitle="Upload Image File" />
                                    </DropZone>
                                </div>
                            </LegacyStack>
                        </LegacyCard.Section>
                        <LegacyCard.Section>
                            <LegacyStack>

                                {data.map((item: any, index: number) => {
                                    return (
                                        <LegacyStack vertical spacing="tight">
                                            <Thumbnail size="large" source={item.src} alt={item.name} />
                                            <Mediamoadl
                                                src={item.src}
                                                name={item.name}
                                                setrefesh={setrefesh}
                                            />
                                        </LegacyStack>
                                    )
                                })}
                            </LegacyStack>
                        </LegacyCard.Section>
                    </LegacyCard>
                </Page>
            }
        </>
    )
}
export default Mediapage;