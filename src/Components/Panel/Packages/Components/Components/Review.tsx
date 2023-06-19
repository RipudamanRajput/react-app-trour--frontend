import { Button, Collapsible, FormLayout, Layout, LegacyCard, LegacyStack, TextField } from "@shopify/polaris";
import React from "react";
import ConfrimDelete from "./Confirmationdelete";

function Review(props: any) {
    
    const {
        setaddreview,
        addreview,
        reviewcollapse,
        setreviewcollapse,
        reviewdata,
        setreviewdata
     } = props;
    return (
        <Layout.AnnotatedSection
            title="Package Reviews"
            description="Kindly Fill Review Details for Package ">
            <LegacyCard sectioned
                actions={[{
                    content: "Add Rivew",
                    onAction: () => {
                        setaddreview([...addreview, (addreview.length - 1) + 1])
                    }
                }]}>
                {addreview?.map((_: any, index: number) => {
                    return (
                        <LegacyCard.Subsection>
                            <LegacyStack vertical spacing="tight">
                                <LegacyStack spacing="tight">
                                    <LegacyStack.Item fill>
                                        <Button
                                            outline
                                            fullWidth
                                            textAlign="left"
                                            onClick={() => { reviewcollapse === index ? setreviewcollapse(-1) : setreviewcollapse(index) }}
                                            disclosure={reviewcollapse === index ? "up" : "down"}>
                                            {`Review ${index + 1}`}
                                        </Button>
                                    </LegacyStack.Item>
                                    <ConfrimDelete
                                        onClick={() => {
                                            setaddreview(
                                                addreview.splice(1)
                                            )
                                            const guide = Object.keys(reviewdata).filter((key: any) =>
                                                key != index).reduce((obj: any, key) => {
                                                    obj[key] = reviewdata[key];
                                                    return obj;
                                                }, {}
                                                );
                                            setreviewdata(guide)
                                        }} />
                                </LegacyStack>
                                <Collapsible
                                    open={reviewcollapse === index}
                                    id="basic-collapsible"
                                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                    expandOnPrint>
                                    <FormLayout>
                                        <FormLayout.Group>
                                            <TextField
                                                requiredIndicator
                                                label="Comment"
                                                autoComplete="off"
                                                placeholder="Enter Comment Here"
                                                value={reviewdata?.[index]?.Comment}
                                                onChange={(e: any) => { setreviewdata({ ...reviewdata, [index]: { ...reviewdata[index], Comment: e } }) }} />
                                            <TextField
                                                requiredIndicator
                                                label="Description"
                                                autoComplete="off"
                                                placeholder="Enter Description"
                                                value={reviewdata?.[index]?.description}
                                                onChange={(e: any) => { setreviewdata({ ...reviewdata, [index]: { ...reviewdata[index], description: e } }) }} />
                                        </FormLayout.Group>
                                        <FormLayout.Group>
                                            <TextField
                                                label="Rating"
                                                autoComplete="off"
                                                min={0}
                                                max={5}
                                                type="number"
                                                inputMode="numeric"
                                                placeholder="0.00"
                                                value={reviewdata?.[index]?.rating}
                                                onChange={(e: any) => { setreviewdata({ ...reviewdata, [index]: { ...reviewdata[index], rating: e } }) }} />
                                            <TextField
                                                requiredIndicator
                                                label="Image URl"
                                                autoComplete="off"
                                                type="url"
                                                inputMode="url"
                                                placeholder="Enter Url"
                                                value={reviewdata?.[index]?.thumbnailUrl}
                                                onChange={(e: any) => { setreviewdata({ ...reviewdata, [index]: { ...reviewdata[index], thumbnailUrl: e } }) }} />
                                        </FormLayout.Group>
                                    </FormLayout>
                                </Collapsible>
                            </LegacyStack>
                        </LegacyCard.Subsection>
                    )
                })}
            </LegacyCard>
        </Layout.AnnotatedSection>
    )
}

export default Review;