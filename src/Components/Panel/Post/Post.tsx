import { Button, LegacyCard, Page, Stack, TextStyle } from "@shopify/polaris";
import { Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Post() {
    const history = useNavigate();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 150
        },
        {
            title: 'Name',
            dataIndex: 'location_name',
            key: 'name',
            width: 150
        },
        {
            title: 'Coordinates',
            key: 'coordinates',
            dataIndex: 'coordinates',
            width: 350,
            render: (_: any, record: any | object) => (
                <Stack vertical spacing="extraTight">
                    <Stack>
                        <TextStyle variation="strong">Longitude:</TextStyle>
                        <TextStyle variation="subdued">{record.coordinates[0].longitude}</TextStyle>
                    </Stack>
                    <Stack>
                        <TextStyle variation="strong">Latitude:</TextStyle>
                        <TextStyle variation="subdued">{record.coordinates[0].latitude}</TextStyle>\
                    </Stack>
                </Stack>
            ),

        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 350
        },
        {
            title: 'Action',
            key: 'action',
            width: 250,
            render: (_: any, record: any | object) => (
                <Stack spacing="extraTight">
                    <Button
                    />
                    <Button
                        outline
                        destructive />
                </Stack>
            ),
        },
    ];
    return (
        <Page
            title="Post"
            fullWidth
            primaryAction={{
                content: "Add Post",
                onAction: () => history("addpost")

            }}>
            <LegacyCard sectioned>
                <Table columns={columns} />
            </LegacyCard>
        </Page>
    );
}

export default Post;