import { Card, FormLayout, Page, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop } from "../../../../Global/Alert";

function AddPackage() {
    const history = useNavigate();
    const [Package, setpackage] = useState();
    const [Hotel, setHotel] = useState();
    const [Loacton, setLoacton] = useState();
    const [Cost, setCost] = useState();
    const [description, setdescription] = useState();

    const addpackage = () => {
        const config = {
            method: "post",
            url: "http://localhost:3001/api/addpackage",
            withCredentials: true,
            data: {
                package_name: Package,
                description: description,
                hotel: Hotel,
                location: Loacton,
                cost: Number(Cost)
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            if (res.data.message) {
                AlertPop("Added", res.data.message, "success");
            }
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    return (
        <Page
            title="Add Package">
            <Card sectioned
                primaryFooterAction={{
                    content: "save",
                    onAction: () => addpackage()
                }}
                secondaryFooterActions={[
                    {
                        content: "Cancel",
                        onAction: () => history(-1)
                    }
                ]}>
                <FormLayout>
                    <TextField
                        requiredIndicator
                        label="Package Name"
                        autoComplete="off"
                        placeholder="Enter Package Name"
                        value={Package}
                        onChange={(e: any) => { setpackage(e) }} />
                    <TextField
                        requiredIndicator
                        label="Hotel Name"
                        autoComplete="off"
                        placeholder="Enter Hotel Name"
                        value={Hotel}
                        onChange={(e: any) => { setHotel(e) }} />
                    <TextField
                        requiredIndicator
                        label="Loaction Name"
                        autoComplete="off"
                        placeholder="Enter Loaction Name"
                        value={Loacton}
                        onChange={(e: any) => { setLoacton(e) }} />
                    <TextField
                        requiredIndicator
                        label="Cost"
                        autoComplete="off"
                        min={0.0}
                        type="number"
                        inputMode="numeric"
                        placeholder="Enter Cost"
                        value={Cost}
                        onChange={(e: any) => { setCost(e) }} />
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
    )
}

export default AddPackage;