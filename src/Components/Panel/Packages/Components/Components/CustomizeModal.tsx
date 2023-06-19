import { LegacyCard, LegacyStack, Modal, TextField, Button, Select, FormLayout } from "@shopify/polaris";
import React from "react";
import {
    EnterMajor
} from '@shopify/polaris-icons';
import { Table } from "antd";
import Confirmdelete from './Confirmationdelete'

export interface CustomizeModalI {
    islands?: any
    setisland?: any
    beaches?: any
    setbeach?: any
    open: boolean
    onClose: (e: any) => void
    label?: string
    setlabel: (e: any) => void
    value?: string
    setvalue: (e: any) => void
    loading?: boolean
    onAdd: () => void
    onRemove: (e: any) => void
    data?: any
}

function CustomizeModal(props: CustomizeModalI): JSX.Element {
    return (
        <Modal
            open={props.open}
            title="Customize"
            onClose={() => props.onClose(!props.open)} >
            <LegacyCard sectioned>
                <LegacyStack vertical>
                    <FormLayout>
                        {props.islands &&
                            <Select
                                label="Island"
                                placeholder="Select Island"
                                requiredIndicator
                                onChange={(selected: any, id: any) => props.setisland(selected)}
                                value={props.islands}
                                options={props.islands} />

                        }
                        {props.beaches &&
                            <Select
                                label="Beach"
                                placeholder="Select Beach"
                                requiredIndicator
                                onChange={(selected: any, id: any) => props.setbeach(selected)}
                                value={props.beaches}
                                options={props.beaches} />
                        }
                    </FormLayout>

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
                                disabled={props.value && props.label ? false : true}
                                primary
                                loading={props.loading}
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
                                return <Confirmdelete
                                    loading={props.loading}
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