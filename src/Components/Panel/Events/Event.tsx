import { Layout, Page } from "@shopify/polaris";
import React, { useState } from "react";
import Sports from "./Sports/sports";
import Islands from "./Islands/Island";
import Beaches from "./Beaches/Beaches";

function Event() {
    const [islands, setislands] = useState<any>([])
    const [beach, setbeach] = useState<any>([])
    return (
        <>
            <Page title="Events & Activity">
                <Layout>
                    <Sports islands={islands} beach={beach} />
                    <Islands setislands={setislands} />
                    <Beaches islands={islands} setbeach={setbeach} />
                </Layout>
            </Page>
        </>
    )
}

export default Event;