import { Card, Checkbox, FormLayout, Page, TextField, Loading } from "@shopify/polaris";
import axios from "axios";
import React, { useState } from "react";
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
    const [loading, setLoading] = useState<boolean>();


    const updateLocation = () => {
        setLoading(true);
        const config = {
            method: "put",
            url: process.env.REACT_APP_SHOP_NAME + "/api/updateloaction/" + id,
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
                breadcrumbs={[{ content: 'Products', url: '/panel/Locations' }]}
                title="Edit Loaction">
                <Card sectioned
                    primaryFooterAction={
                        {
                            content: "Save",
                            loading: loading,
                            onAction: () => updateLocation()
                        }
                    }
                    secondaryFooterActions={[
                        {
                            disabled: loading,
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
        </>
    )
}

export default Editloaction;