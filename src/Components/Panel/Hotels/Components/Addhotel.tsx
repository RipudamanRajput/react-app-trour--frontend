import { Card, DropZone, FormLayout, Page, RadioButton, Stack, TextField, Thumbnail, Loading } from "@shopify/polaris";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop, Sessioncheker } from "../../../../Global/Alert";

function Addhotel() {
    const history = useNavigate();
    const [hotelname, sethotelname] = useState();
    const [Double, setDouble] = useState();
    const [Loaction, setLoaction] = useState();
    const [rating, setRating] = useState();
    const [description, setdescription] = useState();
    const [images, setimages] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>();

console.log(images,"Dasda")
    const addhotel = () => {
        if (images.length !== 0) {
            setLoading(true);
            var formdata = new FormData();
            images.forEach((item: any, index: number) => {
                formdata.append('image', item, `${hotelname}_${index}`);
            })
            formdata.append('data',
                JSON.stringify({
                    hotel_name: hotelname,
                    description: description,
                    single: Double === "single" ? true : false,
                    double: Double === "double" ? true : false,
                    location: Loaction,
                    rating: Number(rating)
                })
            )
            const config = {
                method: "post",
                url: process.env.REACT_APP_SHOP_NAME + "/api/addhotel",
                withCredentials: true,
                data: formdata,
                headers: {
                    'Authorization': process.env.REACT_APP_TOKEN || '',
                    'Content-Type': 'application/json'
                }
            };
            formdata && axios(config).then((res) => {
                Sessioncheker(res)
                if (res.data.message) {
                    AlertPop("Added", res.data.message, "success");
                }
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                AlertPop("Error", err.toString(), "error");
            })
        } else {
            AlertPop("Error", "kindly Add image", "error");
        }
    }

    return (
        <>
            {loading && <Loading />}
            <Page
                breadcrumbs={[{ content: 'Products', url: '/panel/Hotels' }]}
                title="Add Hotel">
                <Card
                    sectioned
                    primaryFooterAction={
                        {
                            content: "save",
                            loading: loading,
                            onAction: () => addhotel()
                        }
                    }
                    secondaryFooterActions={[
                        {
                            content: "Cancel",
                            disabled: loading,
                            onAction: () => history(-1)
                        }
                    ]}>
                    <FormLayout>
                        <Stack>
                            {images?.map((item: any, index: number) => {
                                return (
                                    <Thumbnail key={index} size="large" source={URL.createObjectURL(item)} alt={""} />
                                )
                            })}
                            <DropZone
                                type="image"
                                allowMultiple
                                onDrop={(_dropFile, acceptFiles: File[]) => {
                                    setimages(acceptFiles)
                                }}>

                                <DropZone.FileUpload actionTitle="Upload File" />
                            </DropZone>
                        </Stack>
                        <TextField
                            requiredIndicator
                            label="Hotel Name"
                            autoComplete="off"
                            placeholder="Enter Hotel Name"
                            value={hotelname}
                            onChange={(e: any) => { sethotelname(e) }} />
                        <RadioButton
                            id="double"
                            checked={Double === "double"}
                            label="Double"
                            onChange={(_: any, id: any) => setDouble(id)}
                        />
                        <RadioButton
                            id="single"
                            checked={Double === "single"}
                            label="Single"
                            value={Double}
                            onChange={(_: any, id: any) => setDouble(id)}
                        />
                        {/* <Checkbox
                        checked={Single}
                        id="active"
                        onChange={(check: any) => setSingle(check)}
                        label="Single" />
                    <Checkbox
                        checked={Double}
                        id="active"
                        onChange={(check: any) => setDouble(check)}
                        label="Double" /> */}
                        <TextField
                            requiredIndicator
                            label="Hotel Location"
                            autoComplete="off"
                            placeholder="Enter Hotel Location"
                            value={Loaction}
                            onChange={(e: any) => { setLoaction(e) }} />
                        <TextField
                            requiredIndicator
                            label="Hotel Rating"
                            autoComplete="off"
                            placeholder="Enter Hotel Rating"
                            // error={typeof (Number(rating)) !== "number" && "Kingly Enter value from 1 to 5"}
                            value={rating}
                            type="number"
                            max={5}
                            min={0}
                            inputMode="numeric"
                            onChange={(e: any) => { setRating(e) }} />
                        <TextField
                            label="Loaction Description"
                            autoComplete="off"
                            placeholder="Enter Loaction Description"
                            value={description}
                            multiline={true}
                            onChange={(e: any) => { setdescription(e) }} />
                    </FormLayout>
                </Card>
            </Page>
        </>
    )
}

export default Addhotel;