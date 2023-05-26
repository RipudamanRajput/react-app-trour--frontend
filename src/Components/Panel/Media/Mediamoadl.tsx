import { Button, Modal, Toast, } from "@shopify/polaris";

import React, { useState } from "react";
import { AlertPop, Sessioncheker } from "../../../Global/Alert";
import axios from "axios";

function Mediamoadl(props: any) {
    const { src, name, } = props;
    const [mediamodal, setmediamodal] = useState(false);
    const [loading, setloading] = useState(false);
    const [showtoast, settoast] = useState<any>()

    const deleteimage = (id: any) => {
        setloading(true);
        const config = {
            method: "delete",
            url: process.env.REACT_APP_SHOP_NAME + "/media/removeimage/" + id,
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res)
            setloading(false);
            if (!res.data.result) {
                settoast(res.data.message)
            }

            setmediamodal(!mediamodal)
        }).catch((err) => {
            setloading(false);
            AlertPop("Error", err.toString(), "error");
            setmediamodal(!mediamodal)

        })
    }
    return (
        <>

            <Modal
                secondaryActions={[
                    {
                        content: "View Full image",
                        onAction: () => { window.open(src); }
                    },
                    {
                        content: "Delete",
                        destructive: true,
                        onAction: () => deleteimage("zASas_1.png"),
                        loading: loading
                    }
                ]}
                open={mediamodal}
                activator={
                    <Button
                        plain
                        fullWidth
                        onClick={() => setmediamodal(!mediamodal)}>
                        View
                    </Button>}
                onClose={() => setmediamodal(!mediamodal)}
                title={name}>
                <Modal.Section>
                    <img src={src} alt={name} width={585} />
                </Modal.Section>
            </Modal>
            {showtoast &&
                <Toast content={showtoast} duration={2000} onDismiss={() => settoast(false)} />
            }

        </>
    )
}
export default Mediamoadl;