import { AutoSelection, Button, Collapsible, Combobox, DropZone, FormLayout, Icon, Layout, LegacyCard, LegacyStack, Listbox, Loading, Page, RadioButton, Select, Tag, TextField, Thumbnail } from "@shopify/polaris";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertPop, Sessioncheker } from "../../../../Global/Alert";
import { SearchMinor, DeleteMinor } from '@shopify/polaris-icons';
import CustomizeModal from "./CustomizeModal";
import IncludesItem from "./IncludesItem";


function EditPackage() {
    const { state } = useLocation();
    const { id } = state
    const history = useNavigate();

    const [Packagename, setpackagename] = useState();
    const [Packagetype, setpackagetype] = useState<any>(null);
    const [duration, setduration] = useState();
    const [Cost, setCost] = useState<any>();
    const [discounttype, setdiscounttype] = useState<any>();
    const [discountvalue, setdiscountvalue] = useState<any>();
    const [finalprice, setfinalprice] = useState();
    const [Includes, setIncludes] = useState<string[]>([]);
    const [Itineraries, setItineraries] = useState<any>([]);

    const [adddays, setadddays] = useState<any>([0]);
    const [addactivity, setaddactivity] = useState<any>({});
    const [loading, setLoading] = useState<boolean>();
    const [collapse, setcollapse] = useState<any>();
    const [activitycollapse, setactivitycollapse] = useState<any>();
    const [package_data, setpackage_data] = useState<any>();
    const [producttypeview, setproducttypeview] = useState(false);
    const [customizerefresh, setcustomizerefresh] = useState(false);
    const [include_data, setinclude_data] = useState<any>([]);
    const [includemodal, setincludemodal] = useState(false)
    const [images, setimages] = useState<any>([]);




    // -----------------------   
    const Includestoarray = (includes: any) => {
        let ar: any = [];
        includes.forEach((element: any, index: number) => {
            include_data.forEach((item: any, i: number) => {
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



    const includesarraytoobject = (inclued: any) => {
        let ar: any = [];
        inclued.forEach((element: any) => {
            ar.push(element.include_id)
        });
        return ar;
    }

    const itinerariesarraytoobject = (itineraries: any) => {
        let ar: any = [];
        let arr: any = [];
        let data: any = [];
        itineraries.forEach((element: any, index: number) => {
            const { title, description, activities } = element
            data.push({
                title,
                description,
                ...activities
            })
            ar.push(index);
            arr.push({ length: element.activities.length, list: lenthtoarray(element.activities.length) });
        });
        setaddactivity(arr);
        setadddays(ar);
        return (data)
    }

    useEffect(() => {
        setLoading(true)
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getpackage/" + id,
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res)
            setpackagename(res.data.data.title);
            setpackagetype(res.data.data.package_type);
            setCost(res.data.data.price)
            setduration(res.data.data.duration)
            setdiscounttype(res.data.data.discount_type)
            setdiscountvalue(res.data.data.discount_value)
            setfinalprice(res.data.data.Final_price)
            setIncludes(includesarraytoobject(res.data.data.includes))
            setItineraries(itinerariesarraytoobject(res.data.data.itineraries))

            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            AlertPop("Error", err.toString(), "error");
        })
    }, [])

    var formdata = new FormData();
    Object.keys(images).forEach((item: any, index: number) => {
        Object.keys(images[item]).forEach((activ: any, i: number) => {
            // console.log(`image${item}`, images?.[item]?.[activ]?.[0], `${Itineraries?.[item]?.[activ]?.activitie_name}_${activ}`)
            formdata.append('image', images?.[item]?.[activ]?.[0], `${Itineraries?.[item]?.[activ]?.activitie_name}_${activ}`);
        })
    })
    formdata.append('data',
        JSON.stringify({
            package_type: Packagetype,
            duration: Number(duration),
            title: Packagename,
            price: Number(Cost),
            discount_type: discounttype,
            discount_value: Number(discountvalue),
            Final_price: Number(finalprice),
            includes: Includestoarray(Includes),
            itineraries: Itinerariestoarray(Itineraries)
        })
    )

    const updatepackage = () => {
        setLoading(true);
        const config = {
            method: "put",
            url: process.env.REACT_APP_SHOP_NAME + "/api/updatepackage/" + id,
            withCredentials: true,
            data: formdata,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res)
            if (res.data.status) {
                AlertPop("Updated", "Sucessfuly Updated", "success");
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }

    useEffect(() => {
        setLoading(true);
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getpackagestype",
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            let ar: any = [];
            res.data.data.forEach((item: any) => {
                ar.push({
                    label: item.label,
                    value: item.value
                })
            })
            setpackage_data(ar);
            setLoading(false)
        }).catch(err => {
            setLoading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [])

    useEffect(() => {
        if (discounttype == "percentage") {
            const final: any = Cost * 100 - discountvalue / 100
            setfinalprice(final)
        } else {
            const final: any = Cost - discountvalue
            setfinalprice(final)
        }
    }, [discountvalue, Cost, discounttype])

    // ---------------------------

    const [label, setlabel] = useState<any>();
    const [value, setvalue] = useState<any>();
    const addpackagetype = () => {
        const config = {
            method: "post",
            url: process.env.REACT_APP_SHOP_NAME + "/api/addpackagestype",
            withCredentials: true,
            data: {
                label,
                value
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        if (label && value) {
            axios(config).then((res) => {
                setcustomizerefresh(!customizerefresh)
                Sessioncheker(res)
            }).catch((err) => {
                AlertPop("Error", err.toString(), "error");
            })
        } else {
            AlertPop("Warning", "Kindly Fill required Fields", "warning");
        }
    }

    const deleteitem = (data: any) => {
        const config = {
            method: "delete",
            url: process.env.REACT_APP_SHOP_NAME + "/api/removepackagestype/" + data,
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res);
            setcustomizerefresh(!customizerefresh)

        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    useEffect(() => {
        setLoading(true);
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/getpackagestype",
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res);
            let ar: any = [];
            res.data.data.forEach((item: any) => {
                ar.push({
                    id: item.id,
                    label: item.label,
                    value: item.value
                })
            })
            setpackage_data(ar);
            setLoading(false)
        }).catch(err => {
            setLoading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [customizerefresh])


    const [includelabel, setincludelabel] = useState<any>();
    const [includevalue, setincludevalue] = useState<any>();
    const addincludeitem = () => {
        const config = {
            method: "post",
            url: process.env.REACT_APP_SHOP_NAME + "/api/addicludeitem",
            withCredentials: true,
            data: {
                title: includelabel,
                include_id: includevalue
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        if (includelabel && includevalue) {
            axios(config).then((res) => {
                setcustomizerefresh(!customizerefresh)
                Sessioncheker(res)
            }).catch((err) => {
                AlertPop("Error", err.toString(), "error");
            })
        } else {
            AlertPop("Warning", "Kindly Fill required Fields", "warning");
        }
    }

    const deleteincludeitem = (data: any) => {
        const config = {
            method: "delete",
            url: process.env.REACT_APP_SHOP_NAME + "/api/removeicludeitem/" + data,
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res);
            setcustomizerefresh(!customizerefresh)

        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    useEffect(() => {
        setLoading(true);
        const config = {
            method: "get",
            url: process.env.REACT_APP_SHOP_NAME + "/api/geticludeitem",
            withCredentials: true,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res);
            let ar: any = [];
            res.data.data.forEach((item: any) => {
                ar.push({
                    id: item.id,
                    label: item.title,
                    value: item.include_id
                })
            })
            setinclude_data(ar);
            setLoading(false)
        }).catch(err => {
            setLoading(false);
            AlertPop("Error", err.toString(), "error");
        })
    }, [customizerefresh])
    function imageupdate(index: number, i: number) {
        !images?.[index]?.[i]?.[0] ? setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], images: Itineraries[index]?.[i]?.images } } }) :
            setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], images: "" } } })
    }
    // console.log(Itineraries, "===============>ssa")
    return (
        <>
            {loading && <Loading />}
            <Page
                breadcrumbs={[{ content: 'Products', url: '/panel/Packages' }]}
                title="Edit Package">
                <LegacyCard
                    primaryFooterAction={{
                        content: "save",
                        loading: loading,
                        onAction: () => updatepackage()
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
                                    helpText={
                                        <Button
                                            onClick={() => setproducttypeview(!producttypeview)}
                                            plain>Customize Product type</Button>
                                    }
                                    options={package_data} />
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
                            </FormLayout.Group>
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

                            <FormLayout.Group>

                                <LegacyStack vertical spacing="none">
                                    <RadioButton id="percentage" checked={discounttype === "percentage"} name="price" label={"Percentage"} onChange={(value, id) => setdiscounttype(id)} />
                                    <RadioButton id="numeric" checked={discounttype === "numeric"} name="price" label={"Numeric"} onChange={(value, id) => setdiscounttype(id)} />
                                </LegacyStack>


                                <TextField
                                    label="Discount"
                                    autoComplete="off"
                                    min={0.0}
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="0.00"
                                    value={discountvalue}
                                    onChange={(e: any) => { setdiscountvalue(e) }} />
                                <TextField
                                    label="Final Price"
                                    autoComplete="off"
                                    disabled
                                    min={0.0}
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="0.00"
                                    value={finalprice}
                                    onChange={(e: any) => { setfinalprice(e) }} />
                            </FormLayout.Group>
                            {/* <TextField
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
                                onChange={(e: any) => { setOverview(e) }} /> */}
                            <>
                                <LegacyStack vertical spacing="tight">
                                    {include_data.length > 0 && <IncludesItem
                                        Includes={Includes}
                                        setIncludes={setIncludes}
                                        setincludemodal={setincludemodal}
                                        includemodal={includemodal}
                                        include_data={include_data} />
                                    }
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
                        {adddays?.map((_: any, index: any) => {
                            return (
                                <LegacyStack vertical key={index}>
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
                                                setadddays(adddays.splice(1))
                                                const days = Object.keys(Itineraries).filter((key: any) =>
                                                    key != index).reduce((obj: any, key) => {
                                                        obj[key] = Itineraries[key];
                                                        return obj;
                                                    }, {}
                                                    );
                                                setItineraries(days)
                                            }
                                            } />
                                    </LegacyStack>
                                    <Collapsible
                                        open={collapse === index}
                                        id="basic-collapsible"
                                        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                        expandOnPrint>
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
                                                                        <LegacyStack vertical key={i}>
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

                                                                                    } />
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
                                                                                                imageupdate(index, i);
                                                                                                setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], activitie_name: e } } });

                                                                                            }} />
                                                                                        <LegacyStack >
                                                                                            {images?.[index]?.[i] ?
                                                                                                <Thumbnail key={index} size="large" source={URL.createObjectURL(images?.[index]?.[i][0])} alt={""} /> :
                                                                                                <Thumbnail key={index} size="large" source={Itineraries[index]?.[i]?.images} alt={""} />
                                                                                            }
                                                                                            <DropZone
                                                                                                type="image"
                                                                                                allowMultiple={false}
                                                                                                onDrop={(_dropFile, acceptFiles: File[]) => {
                                                                                                    setimages({ ...images, [index]: { ...images[index], [i]: acceptFiles } })
                                                                                                    setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], images: "" } } })
                                                                                                }}>

                                                                                                <DropZone.FileUpload actionTitle="Upload File" />
                                                                                            </DropZone>
                                                                                        </LegacyStack>
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
                                                                                                setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], description: e } } });
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
                                                                                                <input id="timepick" value={Itineraries[index]?.[i]?.timings} onChange={(e) => { setItineraries({ ...Itineraries, [index]: { ...Itineraries[index], [i]: { ...Itineraries[index]?.[i], timings: e.target.value } } }) }} className="type-time" type="time" />
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
                <CustomizeModal
                    open={producttypeview}
                    onClose={setproducttypeview}
                    data={package_data}
                    onAdd={() => addpackagetype()}
                    onRemove={(e: any) => deleteitem(e)}
                    setlabel={setlabel}
                    setvalue={setvalue}
                    label={label}
                    value={value} />
                <CustomizeModal
                    open={includemodal}
                    onClose={setincludemodal}
                    data={include_data}
                    onAdd={() => addincludeitem()}
                    onRemove={(e: any) => deleteincludeitem(e)}
                    setlabel={setincludelabel}
                    setvalue={setincludevalue}
                    label={includelabel}
                    value={includevalue}
                />
            </Page >
        </>
    )
}

export default EditPackage;