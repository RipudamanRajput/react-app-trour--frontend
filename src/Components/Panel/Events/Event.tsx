import { Layout, Page } from "@shopify/polaris";
import React from "react";
import Sports from "./Sports/sports";
import Islands from "./Islands/Island";
import Beaches from "./Beaches/Beaches";

function Event() {

    return (
        <>
            <Page title="Events & Activity">
                <Layout>
                    <Sports />
                    <Islands />
                    <Beaches />
                </Layout>
            </Page>
        </>
    )
}

export default Event;