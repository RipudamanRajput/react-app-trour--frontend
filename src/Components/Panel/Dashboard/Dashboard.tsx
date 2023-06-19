import { Layout, Page, Stack } from "@shopify/polaris";
import React from "react";
import Grosssales from "./Components/Grosssales";
import Orderstatus from "./Components/Orderstatus";
import Productstatus from "./Components/Productstatus";
import Faq from "./Components/Faq";
import OngoingActivities from "./Components/OngoingActivities";
import CompletedActivities from "./Components/CompletedActivities";

function Dashboard() {

    return (
        <>
            <Page
                title="Dashboard"
                fullWidth
                divider>
                <Layout>
                    <Layout.Section >
                        <Stack vertical spacing="loose">
                            <Stack distribution="fill">
                                <Productstatus />
                                <Orderstatus />
                            </Stack>
                            <Grosssales />
                            <Faq />
                        </Stack>
                    </Layout.Section>
                    <Layout.Section secondary>
                        <OngoingActivities />
                        <CompletedActivities />
                    </Layout.Section>
                </Layout>
            </Page>
        </>
    )
}

export default Dashboard;