import { Card, FormLayout, Loading, Page, TextField } from "@shopify/polaris";
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
    const [loading, setLoading] = useState<boolean>();


    const updateHotel = () => {
        setLoading(true);
        const config = {
            method: "put",
            url: process.env.REACT_APP_SHOP_NAME + "/api/updatepackage/" + id,
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
                breadcrumbs={[{ content: 'Products', url: '/panel/Packages' }]}
                title="Edit Package">
                <Card sectioned
                    primaryFooterAction={{
                        content: "save",
                        loading: loading,
                        onAction: () => updateHotel()
                    }}
                    secondaryFooterActions={[
                        {
                            content: "Cancel",
                            disabled: loading,
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
        </>
    )
}

export default EditPackage;