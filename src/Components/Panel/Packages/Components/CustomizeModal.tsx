import { LegacyCard, LegacyStack, Modal, TextField, Button, Icon } from "@shopify/polaris";
import React from "react";
import {
    EnterMajor, DeleteMinor
} from '@shopify/polaris-icons';
import { Table } from "antd";

function CustomizeModal(props: any) {
    return (
        <Modal
            open={props.open}
            title="Customize"
            onClose={() => props.onClose(!props.open)} >
            <LegacyCard sectioned>
                <LegacyStack vertical>
                    <LegacyStack alignment="baseline" distribution="fill" spacing="tight">
                        <TextField
                            requiredIndicator
                            label="Enter Label"
                            autoComplete="off"
                            placeholder="Enter Package Name"
                            value={props.label}
                            onChange={(e: any) => { props.setlabel(e) }} />
                        <LegacyStack wrap={false} alignment="trailing" spacing="tight">
                            <LegacyStack.Item fill>
                                <TextField
                                    requiredIndicator
                                    label="Enter value"
                                    autoComplete="off"
                                    placeholder="Enter Package Name"
                                    value={props.value}
                                    onChange={(e: any) => { props.setvalue(e.replace(/ /g, '_')) }} />
                            </LegacyStack.Item>
                            <Button
                                primary
                                icon={EnterMajor}
                                onClick={() => { props.onAdd() }} />
                        </LegacyStack>
                    </LegacyStack>
                    <Table columns={[
                        {
                            title: 'Label',
                            dataIndex: 'label',
                            key: 'label',
                            align: 'center',
                            width: 150
                        },
                        {
                            title: 'Value',
                            dataIndex: 'value',
                            key: 'value',
                            align: 'center',
                            width: 150
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            align: 'center',
                            width: 150,
                            render: (_: any, data: any, index: any) => {
                                return <Button
                                    outline
                                    destructive
                                    size="micro"
                                    icon={<Icon
                                        source={DeleteMinor}
                                        color="base"
                                    />}
                                    onClick={() => { props.onRemove(data.id) }}
                                />
                            }
                        },
                    ]}
                        dataSource={props?.data}
                        pagination={false} />
                </LegacyStack>
            </LegacyCard>
        </Modal >
    )
}

export default CustomizeModal;