import { Card, FormLayout, Page, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertPop } from "../../../../Global/Alert";

function EditPackage() {
    const { state } = useLocation();
    const history = useNavigate();
    const { package_name, hotel, location, cost, id } = state;
    const [Package, setpackage] = useState(package_name);
    const [Hotel, setHotel] = useState(hotel);
    const [Loacton, setLoacton] = useState(location);
    const [Cost, setCost] = useState(cost);
    const [description, setdescription] = useState(state.description);

    const updateHotel = () => {
        const config = {
            method: "put",
            url: "http://localhost:3001/api/updatepackage/" + id,
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
            if (res.data.status) {
                AlertPop("Updated", "Sucessfuly Updated", "success");
            }
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    return (
        <Page
            title="Edit Package">
            <Card sectioned
                primaryFooterAction={{
                    content: "save",
                    onAction: () => updateHotel()
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

export default EditPackage;