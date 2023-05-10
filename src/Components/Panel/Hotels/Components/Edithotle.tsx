import { Card, DropZone, FormLayout, Page, RadioButton, Stack, TextField, Thumbnail, Loading } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertPop } from "../../../../Global/Alert";

function Edithotel() {
    const { state } = useLocation();
    const history = useNavigate();
    const { hotel_name, single, location, id, images } = state;
    const [hotelname, sethotelname] = useState(hotel_name);
    const [Double, setDouble] = useState<any>();
    const [Loaction, setLoaction] = useState(location);
    const [rating, setRating] = useState(state.rating);
    const [description, setdescription] = useState(state.description);
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        single === true ? setDouble('single') : setDouble('double')
    }, [])

    const updateHotel = () => {
        setLoading(true);
        const config = {
            method: "put",
            url: process.env.REACT_APP_SHOP_NAME + "/api/updatehotel/" + id,
            withCredentials: true,
            data: {
                hotel_name: hotelname,
                description: description,
                single: Double === "single" ? true : false,
                double: Double === "double" ? true : false,
                location: Loaction,
                rating: Number(rating)
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            if (res.data.status) {
                AlertPop("Updated", "Sucessfuly Updated", "success");
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }

    return (
        <>
            {loading && <Loading />}
            <Page
                breadcrumbs={[{ content: 'Products', url: '/panel/Hotels' }]}
                title="Edit Hotel">
                <Card
                    sectioned
                    primaryFooterAction={
                        {
                            content: "save",
                            loading: loading,
                            onAction: () => updateHotel()
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
                                    <div className="Edit-thumbnail">
                                        <span className="cross"></span>
                                        <Thumbnail key={index} size="large" source={item.src} alt={""} />
                                    </div>
                                )
                            })}
                            <DropZone
                                type="image"
                                allowMultiple
                                onDrop={(_dropFile, acceptFiles) => {
                                    // setimages(acceptFiles)
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
                        label="Single" /> */}

                        {/* <Checkbox
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
                            value={rating}
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
    );
}

export default Edithotel;