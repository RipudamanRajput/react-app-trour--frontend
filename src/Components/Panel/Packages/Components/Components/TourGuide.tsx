import { LegacyCard, Button, LegacyStack, Collapsible, FormLayout, TextField, Layout } from "@shopify/polaris";
import React from "react";
import ConfrimDelete from "./Confirmationdelete";

function TourGuide(props: any) {
    const {
        setaddguide,
        addguide,
        guidecollapse,
        setguidecollapse,
        Guidedata,
        setGuidedata
    } = props;
    return (
        <Layout.AnnotatedSection
            title="Tour Guide's"
            description="Kindly Fill Tour Guide for Package ">
            <LegacyCard sectioned
                actions={[{
                    content: "Add Guide",
                    onAction: () => {
                        setaddguide([...addguide, (addguide.length - 1) + 1])
                    }
                }]}>
                {addguide?.map((_: any, index: number) => {
                    return (
                        <LegacyCard.Subsection>
                            <LegacyStack vertical spacing="tight">
                                <LegacyStack spacing="tight">
                                    <LegacyStack.Item fill>
                                        <Button
                                            outline
                                            fullWidth
                                            textAlign="left"
                                            onClick={() => { guidecollapse === index ? setguidecollapse(-1) : setguidecollapse(index) }}
                                            disclosure={guidecollapse === index ? "up" : "down"}>
                                            {`Guide ${index + 1}`}
                                        </Button>
                                    </LegacyStack.Item>
                                    <ConfrimDelete
                                        onClick={() => {
                                            setaddguide(
                                                addguide.splice(1)
                                            )
                                            const guide = Object.keys(Guidedata).filter((key: any) =>
                                                key != index).reduce((obj: any, key) => {
                                                    obj[key] = Guidedata[key];
                                                    return obj;
                                                }, {}
                                                );
                                            setGuidedata(guide)
                                        }} />
                                </LegacyStack>
                                <Collapsible
                                    open={guidecollapse == index}
                                    id="basic-collapsible"
                                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                    expandOnPrint>
                                    <FormLayout>
                                        <FormLayout.Group>
                                            <TextField
                                                requiredIndicator
                                                label="Guide Name"
                                                autoComplete="off"
                                                placeholder="Enter Guide Name"
                                                value={Guidedata?.[index]?.guide_name}
                                                onChange={(e: any) => { setGuidedata({ ...Guidedata, [index]: { ...Guidedata[index], guide_name: e } }) }} />
                                            <TextField
                                                requiredIndicator
                                                label="Guide Designamtion"
                                                autoComplete="off"
                                                placeholder="Enter Designation"
                                                value={Guidedata?.[index]?.guide_designation}
                                                onChange={(e: any) => { setGuidedata({ ...Guidedata, [index]: { ...Guidedata[index], guide_designation: e } }) }} />
                                        </FormLayout.Group>
                                        <FormLayout.Group>
                                            <TextField
                                                requiredIndicator
                                                label="Guide Description"
                                                autoComplete="off"
                                                placeholder="Enter Description"
                                                value={Guidedata?.[index]?.guide_description}
                                                onChange={(e: any) => { setGuidedata({ ...Guidedata, [index]: { ...Guidedata[index], guide_description: e } }) }} />
                                            <TextField
                                                requiredIndicator
                                                label="Guide Instagram Url"
                                                autoComplete="off"
                                                type="url"
                                                inputMode="url"
                                                placeholder="Enter Url"
                                                value={Guidedata?.[index]?.guide_url}
                                                onChange={(e: any) => { setGuidedata({ ...Guidedata, [index]: { ...Guidedata[index], guide_url: e } }) }} />
                                        </FormLayout.Group>
                                        <TextField
                                            requiredIndicator
                                            label="Guide Image URl"
                                            autoComplete="off"
                                            type="url"
                                            inputMode="url"
                                            placeholder="Enter Url"
                                            value={Guidedata?.[index]?.guide_image}
                                            onChange={(e: any) => { setGuidedata({ ...Guidedata, [index]: { ...Guidedata[index], guide_image: e } }) }} />
                                    </FormLayout>
                                </Collapsible>
                            </LegacyStack>
                        </LegacyCard.Subsection>
                    )
                })}
            </LegacyCard>
        </Layout.AnnotatedSection>
    );
}

export default TourGuide;
