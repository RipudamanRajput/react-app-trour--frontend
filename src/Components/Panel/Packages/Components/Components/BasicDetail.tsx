import { Button, Layout, FormLayout, LegacyCard, LegacyStack, RadioButton, Select, TextField } from "@shopify/polaris";
import React from "react";
import IncludesItem from "./IncludesItem";

function BasicDetail(props: any) {
    return (
        <>
            <Layout.AnnotatedSection
                title="Basic Detail"
                description="Kindly Fill Basic Details Of Package ">
                <LegacyCard sectioned>
                    <FormLayout>
                        <FormLayout.Group condensed>
                            <TextField
                                requiredIndicator
                                label="Package Name"
                                autoComplete="off"
                                placeholder="Enter Package Name"
                                value={props.Packagename}
                                onChange={(e: any) => { props.setpackagename(e) }} />
                            <Select
                                label="Package Type"
                                requiredIndicator
                                onChange={(selected: any, id: any) => props.setpackagetype(selected)}
                                value={props.Packagetype}
                                helpText={
                                    <Button
                                        onClick={() => props.setproducttypeview(!props.producttypeview)}
                                        plain>Customize Product type</Button>
                                }
                                options={props.package_data} />
                            <TextField
                                requiredIndicator
                                label="Duration"
                                autoComplete="off"
                                placeholder="Enter Duration of Package"
                                value={props.duration}
                                type="number"
                                inputMode="numeric"
                                min={0}
                                onChange={(e: any) => { props.setduration(e) }} />
                        </FormLayout.Group>
                        <TextField
                            requiredIndicator
                            label="Overview"
                            autoComplete="off"
                            inputMode="url"
                            multiline={4}
                            placeholder="eg:lorem ipsom"
                            value={props.Overview}
                            onChange={(e: any) => { props.setoverview(e) }} />
                        <FormLayout.Group>
                            <TextField
                                requiredIndicator
                                label="Package Image"
                                autoComplete="off"
                                inputMode="url"
                                placeholder="eg:https//abc/images/da6d65sa4d.jpg"
                                value={props.Packageimg}
                                onChange={(e: any) => { props.setpackageimg(e) }} />
                            <TextField
                                requiredIndicator
                                label="Price"
                                autoComplete="off"
                                min={0.0}
                                type="number"
                                inputMode="numeric"
                                placeholder="0.00"
                                value={props.Cost}
                                onChange={(e: any) => { props.setCost(e) }} />
                        </FormLayout.Group>
                        <FormLayout.Group>

                            <LegacyStack vertical spacing="none">
                                <RadioButton id="percentage" name="price" checked={props.discounttype === "percentage"} label={"Percentage"} onChange={(value, id) => props.setdiscounttype(id)} />
                                <RadioButton id="numeric" name="price" checked={props.discounttype === "numeric"} label={"Numeric"} onChange={(value, id) => props.setdiscounttype(id)} />
                            </LegacyStack>


                            <TextField
                                label="Discount"
                                autoComplete="off"
                                min={0.0}
                                type="number"
                                inputMode="numeric"
                                placeholder="0.00"
                                value={props.discountvalue}
                                onChange={(e: any) => { props.setdiscountvalue(e) }} />
                            <TextField
                                label="Final Price"
                                autoComplete="off"
                                disabled
                                min={0.0}
                                type="number"
                                inputMode="numeric"
                                placeholder="0.00"
                                value={props.finalprice}
                                onChange={(e: any) => { props.setfinalprice(e) }} />
                        </FormLayout.Group>
                        <>
                            <LegacyStack vertical spacing="tight">
                                {props.include_data.length > 0 && <IncludesItem
                                    Includes={props.Includes}
                                    setIncludes={props.setIncludes}
                                    setincludemodal={props.setincludemodal}
                                    includemodal={props.includemodal}
                                    include_data={props.include_data} />
                                }
                            </LegacyStack>
                        </>
                    </FormLayout>
                </LegacyCard>
            </Layout.AnnotatedSection>
        </>
    )
}

export default BasicDetail;