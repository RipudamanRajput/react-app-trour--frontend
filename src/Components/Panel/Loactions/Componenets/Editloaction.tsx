import { Card, Checkbox, FormLayout, Page, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertPop } from "../../../../Global/Alert";

function Editloaction() {
    const { state } = useLocation();
    const history = useNavigate();
    const { location_name, coordinates, active, id } = state;
    const [location, setloacation] = useState<any>(location_name);
    const [longitude, setlongitude] = useState<any>(coordinates[0].longitude);
    const [latitude, setlatitude] = useState<any>(coordinates[0].latitude);
    const [description, setdescription] = useState<any>(state.description);
    const [activelocation, setactivelocation] = useState<any>(active);

    const updateLocation = () => {
        const config = {
            method: "put",
            url: "http://localhost:3001/api/updateloaction/" + id,
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
            if (res.data.status) {
                AlertPop("Updated", "Sucessfuly Updated", "success");
            }
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    return (
        <Page
            breadcrumbs={[{ content: 'Products', url: '/panel/Locations' }]}
            title="Edit Loaction">
            <Card sectioned
                primaryFooterAction={
                    {
                        content: "Save",
                        onAction: () => updateLocation()
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

export default Editloaction;