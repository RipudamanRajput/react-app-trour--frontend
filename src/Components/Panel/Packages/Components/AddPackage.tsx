import { AutoSelection, Button, Collapsible, Combobox, FormLayout, Icon, Layout, LegacyCard, LegacyStack, Listbox, Loading, Page, Select, Tag, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop } from "../../../../Global/Alert";
import { SearchMinor, DeleteMinor } from '@shopify/polaris-icons';

function AddPackage() {
    const history = useNavigate();
    const [Packagename, setpackagename] = useState();
    const [Packagetype, setpackagetype] = useState<any>(null);
    const [duration, setduration] = useState();
    const [Cost, setCost] = useState();
    const [description, setdescription] = useState();
    const [Overview, setOverview] = useState();
    const [Includes, setIncludes] = useState<string[]>([]);
    const [Itineraries, setItineraries] = useState<any>([]);

    const [adddays, setadddays] = useState<any>([0]);
    const [addactivity, setaddactivity] = useState<any>({});
    const [loading, setLoading] = useState<boolean>();
    const [collapse, setcollapse] = useState<any>();
    const [activitycollapse, setactivitycollapse] = useState<any>();

    // -----------------------

    const removeincludes = useMemo(
        () => [
            { value: 'cab', label: 'Cab' },
            { value: 'ferry', label: 'Ferry' },
            { value: 'sightseeing', label: 'Sightseeing' },
            { value: 'hotel', label: 'Hotel' },
            { value: 'breakfast', label: 'Breakfast' },
            { value: 'pickup_drop', label: 'Pickup Drop' },
            { value: 'water_ride', label: 'Water Ride' },
            { value: 'island_tour', label: 'Island Tour' },
        ],
        [],
    );
    const Includestoarray = (includes: any) => {
        let ar: any = [];
        includes.forEach((element: any, index: number) => {
            removeincludes.forEach((item: any, i: number) => {
                if (element === item.value) {
                    ar.push({
                        include_id: item.value,
                        title: item.label
                    })
                }
            })
        });
        return ar;
    }

    const Itinerariestoarray = (itineraries: any) => {
        let ar: any = [];
        const activitiestoarray = (activities: any) => {
            const arr: any = [];
            const { title, description, ...rest } = activities;
            Object.keys(rest).forEach((item: any, index: number) => {
                arr.push(rest[item])
            })
            return arr;
        }
        Object.keys(itineraries).forEach((element: any, index: number) => {
            ar.push({
                title: itineraries[element]?.title,
                description: itineraries[element]?.description,
                activities: activitiestoarray(itineraries[element])
            })
        });
        return ar;
    }

    function lenthtoarray(length: any) {
        const ar = [];
        for (let i = 0; i < length; i++) {
            ar.push(i)
        }
        return ar;
    }

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(removeincludes);

    const updateText = useCallback(
        (value: string) => {
            setInputValue(value);

            if (value === '') {
                setOptions(removeincludes);
                return;
            }

            const filterRegex = new RegExp(value, 'i');
            const resultOptions = removeincludes.filter((option: any) =>
                option.label.match(filterRegex),
            );
            setOptions(resultOptions);
        },
        [removeincludes],
    );

    const updateSelection = useCallback(
        (selected: string) => {
            if (Includes.includes(selected)) {
                setIncludes(
                    Includes.filter((option) => option !== selected),
                );
            } else {
                setIncludes([...Includes, selected]);
            }

            updateText('');
        },
        [Includes, updateText],
    );

    const removeTag = useCallback(
        (tag: string) => () => {
            const options = [...Includes];
            options.splice(options.indexOf(tag), 1);
            setIncludes(options);
        },
        [Includes],
    );

    const tagsMarkup = Includes.map((option) => (
        <Tag key={`option-${option}`} onRemove={removeTag(option)}>
            {option}
        </Tag>
    ));

    const optionsMarkup =
        options.length > 0
            ? options.map((option: any) => {
                const { label, value } = option;
                return (
                    <Listbox.Option
                        key={`${value}`}
                        value={value}
                        selected={Includes.includes(value)}
                        accessibilityLabel={label}
                    >
                        {label}
                    </Listbox.Option>
                );
            })
            : null;

    const addpackage = () => {
        setLoading(true);
        const config = {
            method: "post",
            url: process.env.REACT_APP_SHOP_NAME + "/api/addpackage",
            withCredentials: true,
            data: {
                package_type: Packagetype,
                duration: Number(duration),
                title: Packagename,
                price: Number(Cost),
                description: description,
                overview: Overview,
                includes: Includestoarray(Includes),
                itineraries: Itinerariestoarray(Itineraries)
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            if (res.data.message) {
                AlertPop("Added", res.data.message, "success");
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }

    return (
        <>
            {loading && <Loading />}
            <Page
                breadcrumbs={[{ content: 'Products', url: '/panel/Packages' }]}
                title="Add Package">
                <LegacyCard
                    primaryFooterAction={{
                        content: "save",
                        loading: loading,
                        onAction: () => addpackage()
                    }}
                    secondaryFooterActions={[
                        {
                            content: "Cancel",
                            disabled: loading,
                            onAction: () => history(-1)
                        }
                    ]}>
                    <LegacyCard.Section>
                        <FormLayout>
                            <FormLayout.Group>
                                <TextField
                                    requiredIndicator
                                    label="Package Name"
                                    autoComplete="off"
                                    placeholder="Enter Package Name"
                                    value={Packagename}
                                    onChange={(e: any) => { setpackagename(e) }} />
                                <Select
                                    label="Package Type"
                                    requiredIndicator
                                    onChange={(selected: any, id: any) => setpackagetype(selected)}
                                    value={Packagetype}
                                    options={[
                                        {
                                            label: "Select",
                                            value: "null"
                                        },
                                        {
                                            label: "Platinum",
                                            value: "platinum"
                                        },
                                        {
                                            label: "Golden",
                                            value: "golden"
                                        },
                                        {
                                            label: "Silver",
                                            value: "silver"
                                        }
                                    ]} />
                            </FormLayout.Group>
                            <FormLayout.Group>
                                <TextField
                                    requiredIndicator
                                    label="Duration"
                                    autoComplete="off"
                                    placeholder="Enter Duration of Package"
                                    value={duration}
                                    type="number"
                                    inputMode="numeric"
                                    min={0}
                                    onChange={(e: any) => { setduration(e) }} />
                                <TextField
                                    requiredIndicator
                                    label="Price"
                                    autoComplete="off"
                                    min={0.0}
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="Enter Price"
                                    value={Cost}
                                    onChange={(e: any) => { setCost(e) }} />
                            </FormLayout.Group>
                            <TextField
                                label="Loaction Description"
                                autoComplete="off"
                                placeholder="Enter Loaction Description"
                                value={description}
                                multiline={4}
                                onChange={(e: any) => { setdescription(e) }} />
                            <TextField
                                requiredIndicator
                                label="Overview"
                                autoComplete="off"
                                placeholder="Enter Overview"
                                value={Overview}
                                multiline={4}
                                onChange={(e: any) => { setOverview(e) }} />
                            <>
                                <LegacyStack vertical spacing="tight">
                                    <Combobox
                                        allowMultiple
                                        activator={
                                            <Combobox.TextField
                                                prefix={<Icon source={SearchMinor} />}
                                                onChange={updateText}
                                                label="Includes"
                                                value={inputValue}
                                                placeholder="Search tags"
                                                autoComplete="off"
                                            />
                                        }>
                                        {optionsMarkup ? (
                                            <Listbox
                                                autoSelection={AutoSelection.None}
                                                onSelect={updateSelection}>
                                                {optionsMarkup}
                                            </Listbox>
                                        ) : null}
                                    </Combobox>
                                    <LegacyStack>{tagsMarkup}</LegacyStack>
                                </LegacyStack>
                            </>
                        </FormLayout>
                    </LegacyCard.Section>

                    <LegacyCard.Section
                        title="Itineraries"
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
                                <LegacyStack vertical>
                                    <LegacyStack spacing="tight">
                                        <LegacyStack.Item fill>
                                            <Button
                                                outline
                                                fullWidth
                                                textAlign="left"
                                                disclosure={collapse ? "up" : "down"}
                                                onClick={() => collapse === index ? setcollapse(-1) : setcollapse(index)}>
                                                {`Day ${index + 1}`}
                                            </Button>
                                        </LegacyStack.Item>
                                        <Button
                                            outline
                                            destructive
                                            icon={DeleteMinor}
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
                                            }
                                            }
                                        />
                                    </LegacyStack>
                                    <Collapsible
                                        open={collapse === index}
                                        id="basic-collapsible"
                                        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                        expandOnPrint
                                    >
                                        <div style={{ marginBottom: "16px" }}>
                                            <LegacyStack vertical wrap={false}>
                                                <Layout>
                                                    <Layout.AnnotatedSection
                                                        title="Itineraries Details"
                                                        description="Add Basic Itineraries details">
                                                        <FormLayout>
                                                            <TextField
                                                                label="Title"
                                                                autoComplete="off"
                                                                requiredIndicator
                                                                placeholder="Enter Title"
                                                                value={Itineraries[index]?.title}
                                                                onChange={(e: any) => { setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], title: e } }) }} />
                                                            <TextField
                                                                label="Description"
                                                                autoComplete="off"
                                                                requiredIndicator
                                                                placeholder="Enter Description"
                                                                value={Itineraries[index]?.description}
                                                                multiline={4}
                                                                onChange={(e: any) => { setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], description: e } }) }} />
                                                        </FormLayout>
                                                    </Layout.AnnotatedSection>

                                                    <Layout.AnnotatedSection
                                                        title="Activities"
                                                        description="Add Activities details">
                                                        <LegacyCard
                                                            sectioned
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
                                                            {
                                                                addactivity[index]?.list.map((item: any, i: number) => {
                                                                    return (
                                                                        <LegacyStack vertical>
                                                                            <LegacyStack spacing="tight">
                                                                                <LegacyStack.Item fill>
                                                                                    <Button
                                                                                        outline
                                                                                        fullWidth
                                                                                        textAlign="left"
                                                                                        disclosure={activitycollapse ? "up" : "down"}
                                                                                        onClick={() => activitycollapse === i ? setactivitycollapse(-1) : setactivitycollapse(i)}>
                                                                                        {`Activity ${i + 1}`}
                                                                                    </Button>
                                                                                </LegacyStack.Item>
                                                                                <Button
                                                                                    outline
                                                                                    destructive
                                                                                    icon={DeleteMinor}
                                                                                    onClick={() => {
                                                                                        setaddactivity(
                                                                                            {
                                                                                                ...addactivity,
                                                                                                [index]: addactivity[index]?.length ? { length: addactivity[index]?.length - 1, list: lenthtoarray(addactivity[index]?.length - 1) } : { length: 1, list: lenthtoarray(1) }

                                                                                            }
                                                                                        )
                                                                                        const Activity = Object.keys(Itineraries?.[index]).filter((key: any) =>
                                                                                            key != i).reduce((obj: any, key) => {
                                                                                                obj[key] = Itineraries?.[index][key];
                                                                                                return obj;
                                                                                            }, {}
                                                                                            );
                                                                                        setItineraries({ ...Itineraries, [index]: { ...Activity } })
                                                                                    }
                                                                                    }
                                                                                />
                                                                            </LegacyStack>
                                                                            <Collapsible
                                                                                open={activitycollapse === i}
                                                                                id="basic-collapsible"
                                                                                transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                                                                expandOnPrint>
                                                                                <div style={{ marginBottom: "16px" }}>
                                                                                    <FormLayout>
                                                                                        <TextField
                                                                                            label="Activity Name"
                                                                                            autoComplete="off"
                                                                                            requiredIndicator
                                                                                            placeholder="Enter Activity Name"
                                                                                            value={
                                                                                                Itineraries[index]?.[i]?.activitie_name
                                                                                            }
                                                                                            onChange={(e: any) => {
                                                                                                setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], activitie_name: e } } })
                                                                                            }} />
                                                                                        <TextField
                                                                                            label="Description"
                                                                                            autoComplete="off"
                                                                                            requiredIndicator
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
                                                                                                requiredIndicator
                                                                                                placeholder="Enter Location"
                                                                                                value={
                                                                                                    Itineraries[index]?.[i]?.location
                                                                                                }
                                                                                                onChange={(e: any) => {
                                                                                                    setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], location: e } } })
                                                                                                }} />
                                                                                            <div className="time-filed">
                                                                                                <label htmlFor="timepick"> time</label>
                                                                                                <input id="timepick" onChange={(e) => { setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], timings: e.target.value } } }) }} className="type-time" type="time" />
                                                                                            </div>
                                                                                        </FormLayout.Group>

                                                                                    </FormLayout>
                                                                                </div>
                                                                            </Collapsible>
                                                                        </LegacyStack>
                                                                    )
                                                                })
                                                            }
                                                        </LegacyCard>
                                                    </Layout.AnnotatedSection>
                                                </Layout>
                                            </LegacyStack>
                                        </div>
                                    </Collapsible>
                                </LegacyStack>
                            )
                        })}
                    </LegacyCard.Section>
                </LegacyCard>
            </Page >
        </>
    )
}

export default AddPackage;


