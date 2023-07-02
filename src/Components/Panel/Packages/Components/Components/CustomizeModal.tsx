import { LegacyCard, LegacyStack, Modal, TextField, Button, Select, FormLayout } from "@shopify/polaris";
import React from "react";
import {
    EnterMajor
} from '@shopify/polaris-icons';
import { Table } from "antd";
import Confirmdelete from './Confirmationdelete'

export interface CustomizeModalI {
    setinludeimg?: any
    indludeimg?:any,
    islands?: any
    setisland?: any
    islandsOptions?: any
    isbeachesOptions?: any
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
                        {props.islandsOptions &&
                            <Select
                                label="Island"
                                placeholder="Select Island"
                                requiredIndicator
                                onChange={(selected: any, id: any) => props.setisland(selected)}
                                value={props.islands}
                                options={props.islandsOptions} />

                        }
                        {props.isbeachesOptions &&
                            <Select
                                label="Beach"
                                placeholder="Select Beach"
                                requiredIndicator
                                onChange={(selected: any, id: any) => props.setbeach(selected)}
                                value={props.beaches}
                                options={props.isbeachesOptions} />
                        }
                    </FormLayout>

                    <LegacyStack alignment="trailing" distribution="fill" spacing="tight">
                        <TextField
                            requiredIndicator
                            label="Enter Label"
                            autoComplete="off"
                            placeholder="Enter Package Name"
                            value={props.label}
                            onChange={(e: any) => {
                                props.setlabel(e)
                                props.setvalue && props.setvalue(e.replace(/ /g, '_'))
                            }} />
                            
                        {/* <LegacyStack wrap={false} alignment="baseline"  spacing="tight">
                            <LegacyStack.Item fill> */}
                                {props.setinludeimg && <TextField
                                    requiredIndicator
                                    label="Enter Image Url"
                                    autoComplete="off"
                                    placeholder="Enter Image Url"
                                    value={props.indludeimg}
                                    onChange={(e: any) => {
                                        props.setinludeimg(e)
                                    }} />
                                    // :
                                    // <TextField
                                    //     requiredIndicator
                                    //     label="Enter Image Url"
                                    //     autoComplete="off"
                                    //     placeholder="Enter Image Url"
                                    //     value={props.value}
                                    //     onChange={(e: any) => {
                                    //         props.setvalue(e)
                                    //     }} />
                                }
                            {/* </LegacyStack.Item> */}
                            <Button
                                disabled={props.value && props.label ? false : true}
                                primary
                                loading={props.loading}
                                icon={EnterMajor}
                                onClick={() => { props.onAdd() }} />
                        </LegacyStack>
                    {/* </LegacyStack> */}
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