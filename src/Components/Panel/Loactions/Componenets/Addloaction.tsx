import { Card, Checkbox, FormLayout, Page, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop } from "../../../../Global/Alert";

function Addloaction() {
    const history = useNavigate();
    const [location, setloacation] = useState<any>();
    const [longitude, setlongitude] = useState<any>();
    const [latitude, setlatitude] = useState<any>();
    const [description, setdescription] = useState<any>();
    const [activelocation, setactivelocation] = useState<any>(false);

    const addLocation = () => {
        const config = {
            method: "post",
            url: "http://localhost:3001/api/addloaction" ,
            withCredentials: true,
            data: {
                location_name: location,
                description: description,
                coordinates: {
                    longitude: longitude,
                    latitude: latitude
                },
                active: activelocation
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
            breadcrumbs={[{ content: 'Products', url: '/panel/Locations' }]}
            title="Add Loaction">
            <Card sectioned
                primaryFooterAction={
                    {
                        content: "Save",
                        onAction: () => addLocation()
                    }
                }
                secondaryFooterActions={[
                    {
                        content: "Cancel",
                        onAction: () => history(-1)
                    }
                ]}>
                <FormLayout>
                    <TextField
                        requiredIndicator
                        label="Loaction Name"
                        autoComplete="off"
                        placeholder="Enter Loaction Name"
                        value={location}
                        onChange={(e) => { setloacation(e) }} />
                    <FormLayout.Group>
                        <TextField
                            requiredIndicator
                            label="Longitude"
                            autoComplete="off"
                            placeholder="Enter Longitude value"
                            value={longitude}
                            onChange={(e) => { setlongitude(e) }} />
                        <TextField
                            requiredIndicator
                            label="Latitude"
                            autoComplete="off"
                            placeholder="Enter Latitude Vlaue"
                            value={latitude}
                            onChange={(e) => { setlatitude(e) }} />
                    </FormLayout.Group>
                    <TextField
                        label="Loaction Description"
                        autoComplete="off"
                        placeholder="Enter Loaction Description"
                        value={description}
                        multiline={true}
                        onChange={(e) => { setdescription(e) }} />
                    <Checkbox
                        checked={activelocation}
                        id="active"
                        onChange={(check) => setactivelocation(check)}
                        label="Check to make loaction Active" />
                </FormLayout>
            </Card>
        </Page>
    )
}
export default Addloaction;