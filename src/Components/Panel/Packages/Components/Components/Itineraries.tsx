import { Banner, Button, Collapsible, DropZone, FormLayout, Layout, LegacyCard, LegacyStack, TextField, Thumbnail } from "@shopify/polaris";
import React from "react";
import Activitylist from "./Activitylist";
import ConfrimDelete from "./Confirmationdelete";

function Itinerariespage(props: any) {
    const {
        setadddays,
        adddays,
        collapse,
        setcollapse,
        Itineraries,
        setItineraries,
        setaddactivity,
        addactivity,
        lenthtoarray,
        activitycollapse,
        setactivitycollapse,
        images,
        setimages
    } = props;
    return (
        <Layout.AnnotatedSection
            title="Itineraries"
            description="Kindly Fill Itineraries Of Package ">
            <LegacyCard sectioned
                actions={[
                    {
                        content: "Add More",
                        onAction: () => {
                            setadddays([...adddays, (adddays.length - 1) + 1])
                        }
                    }
                ]}>
                {adddays?.map((_: any, index: number) => {
                    return (
                        <LegacyStack vertical key={index}>
                            <LegacyStack spacing="tight">
                                <LegacyStack.Item fill>
                                    <Button
                                        outline
                                        fullWidth
                                        textAlign="left"
                                        disclosure={collapse === index ? "up" : "down"}
                                        onClick={() => collapse === index ? setcollapse(-1) : setcollapse(index)}>
                                        {`Day ${index + 1}`}
                                    </Button>
                                </LegacyStack.Item>
                                <ConfrimDelete
                                    onClick={() => {
                                        setadddays(
                                            adddays.splice(1)
                                        )
                                        const days = Object.keys(Itineraries).filter((key: any) =>
                                            key != index).reduce((obj: any, key) => {
                                                obj[key] = Itineraries[key];
                                                return obj;
                                            }, {}
                                            );
                                        setItineraries(days)
                                    }} />
                            </LegacyStack>
                            <Collapsible
                                open={collapse === index}
                                id="basic-collapsible"
                                transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                expandOnPrint>
                                <div style={{ marginBottom: "16px" }}>
                                    <LegacyStack vertical wrap={false}>
                                        <FormLayout>
                                            <TextField
                                                label="Title"
                                                autoComplete="off"

                                                placeholder="Enter Title"
                                                value={Itineraries[index]?.title}
                                                onChange={(e: any) => { setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], title: e } }) }} />
                                            <TextField
                                                label="Description"
                                                autoComplete="off"

                                                placeholder="Enter Description"
                                                value={Itineraries[index]?.description}
                                                multiline={4}
                                                onChange={(e: any) => { setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], description: e } }) }} />
                                        </FormLayout>

                                        <LegacyCard
                                            actions={[{
                                                content: "Add more Activities",
                                                onAction: () => {
                                                    setaddactivity(
                                                        {
                                                            ...addactivity,
                                                            [index]: addactivity[index]?.length ? { length: addactivity[index]?.length + 1, list: lenthtoarray(addactivity[index]?.length + 1) } : { length: 1, list: lenthtoarray(1) }
                                                        }
                                                    )
                                                }
                                            }]}>

                                            {addactivity[index]?.list.map((item: any, i: number) => {
                                                return (
                                                    <LegacyCard.Section>
                                                        <div style={{ marginBottom: "16px" }}>
                                                            {!Itineraries[index]?.[i]?.activitie_name &&
                                                                <Banner status="info">
                                                                    Kindly select Activity to delete it.
                                                                </Banner>
                                                            }
                                                        </div>
                                                        <LegacyStack vertical key={i}>
                                                            <LegacyStack spacing="tight">
                                                                <LegacyStack.Item fill>
                                                                    <Button
                                                                        outline
                                                                        fullWidth
                                                                        textAlign="left"
                                                                        disclosure={activitycollapse === i ? "up" : "down"}
                                                                        onClick={() => activitycollapse === i ? setactivitycollapse(-1) : setactivitycollapse(i)}>
                                                                        {`Activity ${i + 1}`}
                                                                    </Button>
                                                                </LegacyStack.Item>
                                                                <ConfrimDelete
                                                                    disabled={Itineraries[index]?.[i]?.activitie_name ? false : true}
                                                                    onClick={() => {
                                                                        setaddactivity(
                                                                            {
                                                                                ...addactivity,
                                                                                [index]: addactivity[index]?.length ? { length: addactivity[index]?.length - 1, list: lenthtoarray(addactivity[index]?.length - 1) } : { length: 1, list: lenthtoarray(1) }
                                                                            }
                                                                        )
                                                                        const Activity = Object.keys(Itineraries?.[index]).filter((key: any) =>
                                                                            key != i).reduce((obj: any, key) => {
                                                                                obj[key] = Itineraries?.[index]?.[key];

                                                                                return obj;
                                                                            }, {}
                                                                            );
                                                                        setItineraries({ ...Itineraries, [index]: { ...Activity } })
                                                                    }} />
                                                            </LegacyStack>
                                                            <Collapsible
                                                                open={activitycollapse === i}
                                                                id="basic-collapsible"
                                                                transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                                                expandOnPrint>
                                                                <div style={{ marginBottom: "16px" }}>
                                                                    <LegacyStack vertical>
                                                                        <FormLayout>
                                                                            <Activitylist
                                                                                label="Activity Name"
                                                                                placeholder="Select Activity"
                                                                                value={
                                                                                    Itineraries[index]?.[i]?.activitie_name
                                                                                }
                                                                                requiredIndicator
                                                                                onChange={(e: any) => {
                                                                                    setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], activitie_name: e } } })
                                                                                }} />
                                                                            <LegacyStack>

                                                                                {images?.[index]?.[i] &&
                                                                                    <Thumbnail key={index} size="large" source={URL.createObjectURL(images?.[index]?.[i][0])} alt={""} />
                                                                                }
                                                                                <DropZone
                                                                                    type="image"
                                                                                    allowMultiple={false}
                                                                                    onDrop={(_dropFile, acceptFiles: File[]) => {
                                                                                        setimages({ ...images, [index]: { ...images[index], [i]: acceptFiles } })
                                                                                    }}>

                                                                                    <DropZone.FileUpload actionTitle="Upload File" />
                                                                                </DropZone>

                                                                            </LegacyStack>
                                                                            <TextField
                                                                                label="Description"
                                                                                autoComplete="off"

                                                                                placeholder="Enter Description"
                                                                                value={
                                                                                    Itineraries[index]?.[i]?.description
                                                                                }
                                                                                multiline={4}
                                                                                onChange={(e: any) => {
                                                                                    setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], description: e } } })
                                                                                }} />
                                                                            <FormLayout.Group>
                                                                                <TextField
                                                                                    label="Location"
                                                                                    autoComplete="off"

                                                                                    placeholder="Enter Location"
                                                                                    value={
                                                                                        Itineraries[index]?.[i]?.location
                                                                                    }
                                                                                    onChange={(e: any) => {
                                                                                        setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], location: e } } })
                                                                                    }} />
                                                                                <div className="time-filed">
                                                                                    <label htmlFor="timepick"> time</label>
                                                                                    <input value={Itineraries[index]?.[i]?.timings} id="timepick" onChange={(e) => { setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], timings: e.target.value } } }) }} className="type-time" type="time" />
                                                                                </div>
                                                                            </FormLayout.Group>

                                                                        </FormLayout>
                                                                    </LegacyStack>
                                                                </div>
                                                            </Collapsible>
                                                        </LegacyStack>
                                                    </LegacyCard.Section>
                                                )
                                            })
                                            }
                                        </LegacyCard>
                                    </LegacyStack>
                                </div>
                            </Collapsible>
                        </LegacyStack>
                    )
                })}
            </LegacyCard>
        </Layout.AnnotatedSection>
    )
}

export default Itinerariespage;