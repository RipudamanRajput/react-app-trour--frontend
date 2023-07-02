import { Layout, Loading, Page } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AlertPop, Sessioncheker } from "../../../../../Global/Alert";
import CustomizeModal from "../Components/CustomizeModal";
import BasicDetail from "../Components/BasicDetail";
import Itinerariespage from "../Components/Itineraries";
import TourGuide from "../Components/TourGuide";
import Review from "../Components/Review";
import { Includestoarray, Itinerariestoarray, deleteincludeitem, lenthtoarray } from "../Components/Functions";

function EditPackage() {
    const { state } = useLocation();
    const { id } = state;

    const [Packagename, setpackagename] = useState();
    const [Packagetype, setpackagetype] = useState<any>(null);
    const [duration, setduration] = useState();
    const [Overview, setoverview] = useState();
    const [description, setdescription] = useState();
    const [Packageimg, setpackageimg] = useState<string>();
    const [Cost, setCost] = useState<any>();
    const [discounttype, setdiscounttype] = useState<any>();
    const [discountvalue, setdiscountvalue] = useState<any>();
    const [finalprice, setfinalprice] = useState();
    const [Includes, setIncludes] = useState<string[]>([]);
    const [Itineraries, setItineraries] = useState<any>([]);
    const [Guidedata, setGuidedata] = useState<any>([]);
    const [reviewdata, setreviewdata] = useState<any>([]);

    const [adddays, setadddays] = useState<any>([0]);
    const [addactivity, setaddactivity] = useState<any>({});
    const [loading, setLoading] = useState<boolean>();
    const [collapse, setcollapse] = useState<any>();
    const [reviewcollapse, setreviewcollapse] = useState<any>();
    const [guidecollapse, setguidecollapse] = useState<any>();
    const [addguide, setaddguide] = useState<any>([0]);
    const [addreview, setaddreview] = useState<any>([0]);
    const [activitycollapse, setactivitycollapse] = useState<any>();
    const [package_data, setpackage_data] = useState<any>();
    const [producttypeview, setproducttypeview] = useState(false);
    const [customizerefresh, setcustomizerefresh] = useState(false);
    const [include_data, setinclude_data] = useState<any>([]);
    const [includemodal, setincludemodal] = useState(false)
    const [indludeimg, setinludeimg] = useState();
    const [images, setimages] = useState<any>([]);

    const Guidedetailset = (guide: any) => {
        const ar: any = [];
        const arr: any = [];
        guide.forEach((item: any, index: number) => {
            arr.push(index)
            ar.push({
                guide_name: item.Guide_name,
                guide_designation: item.Guide_designation,
                guide_description: item.Guide_description,
                guide_url: item.Guide_social,
                guide_image: item.Guide_thumbnail,
            })
        })
        setGuidedata({ ...ar })
        setaddguide(arr)
    }
    const reviewdetailset = (guide: any) => {
        const ar: any = [];
        const arr: any = [];
        guide.forEach((item: any, index: number) => {
            arr.push(index)
            ar.push({
                Comment: item.Comment,
                description: item.description,
                rating: Number(item.rating),
                thumbnailUrl: item.thumbnailUrl,
            })
        })
        setreviewdata({ ...ar })
        setaddreview(arr)
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
            setpackageimg(res.data.data.packageimg)
            setdescription(res.data.data.description)
            setoverview(res.data.data.overview)
            setCost(res.data.data.price)
            setduration(res.data.data.duration)
            setdiscounttype(res.data.data.discount_type)
            setdiscountvalue(res.data.data.discount_value)
            setfinalprice(res.data.data.Final_price)
            setIncludes(includesarraytoobject(res.data.data.includes))
            setItineraries(itinerariesarraytoobject(res.data.data.itineraries))
            Guidedetailset(res.data.data.Guide)
            reviewdetailset(res.data.data.reviews)

            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            AlertPop("Error", err.toString(), "error");
        })
    }, [])

    function Guide(Guidedata: any) {
        const ar: any = [];
        Object.keys(Guidedata)?.forEach((_: any, index) => {
            ar.push({
                Guide_name: Guidedata?.[index]?.guide_name,
                Guide_designation: Guidedata?.[index]?.guide_designation,
                Guide_description: Guidedata?.[index]?.guide_description,
                Guide_social: Guidedata?.[index]?.guide_url,
                Guide_thumbnail: Guidedata?.[index]?.guide_image
            })
        })
        return ar;
    }

    function Reviewdata() {
        const ar: any = [];
        Object.keys(reviewdata).forEach(item => {
            ar.push({
                Comment: reviewdata?.[item]?.Comment,
                description: reviewdata?.[item]?.description,
                rating: Number(reviewdata?.[item]?.rating),
                thumbnailUrl: reviewdata?.[item]?.thumbnailUrl,
                Guide_thumbnail: reviewdata?.[item]?.guide_image
            })
        })
        return ar;
    }

    var formdata = new FormData();
    Object.keys(images).forEach((item: any, index: number) => {
        Object.keys(images[item]).forEach((activ: any, i: number) => {
            formdata.append('image', images?.[item]?.[activ]?.[0], `${Itineraries?.[item]?.[activ]?.activitie_name}_${activ}`);
        })
    })

    formdata.append('data',
        JSON.stringify({
            package_type: Packagetype,
            duration: Number(duration),
            title: Packagename,
            overview: Overview,
            description:description,
            packageimg: Packageimg,
            price: Number(Cost),
            discount_type: discounttype,
            discount_value: Number(discountvalue),
            Final_price: Number(finalprice),
            includes: Includestoarray(Includes, include_data),
            itineraries: Itinerariestoarray(Itineraries),
            Guide: Guide(Guidedata),
            reviews: Reviewdata()
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
        if (discounttype === "percentage") {
            const final: any = Cost * (100 - discountvalue) / 100
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
                include_id: includevalue,
                image:indludeimg
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

    return (
        <>
            {loading && <Loading />}
            <Page
                breadcrumbs={[{ content: 'Products', url: '/panel/Packages' }]}
                title="Edit Package"
                primaryAction={{
                    content: "save",
                    loading: loading,
                    onAction: () => updatepackage()
                }}>
                <Layout>
                    <BasicDetail
                        Packagename={Packagename}
                        setpackagename={setpackagename}
                        setpackagetype={setpackagetype}
                        Packagetype={Packagetype}
                        setproducttypeview={setproducttypeview}
                        producttypeview={producttypeview}
                        package_data={package_data}
                        duration={duration}
                        setduration={setduration}
                        description={description}
                        setdescription={setdescription}
                        Overview={Overview}
                        setoverview={setoverview}
                        Packageimg={Packageimg}
                        setpackageimg={setpackageimg}
                        Cost={Cost}
                        setCost={setCost}
                        setdiscounttype={setdiscounttype}
                        discountvalue={discountvalue}
                        setdiscountvalue={setdiscountvalue}
                        finalprice={finalprice}
                        setfinalprice={setfinalprice}
                        include_data={include_data}
                        Includes={Includes}
                        setIncludes={setIncludes}
                        setincludemodal={setincludemodal}
                        includemodal={includemodal}
                        discounttype={discounttype}
                    />
                    <Itinerariespage
                        setadddays={setadddays}
                        adddays={adddays}
                        collapse={collapse}
                        setcollapse={setcollapse}
                        Itineraries={Itineraries}
                        setItineraries={setItineraries}
                        setaddactivity={setaddactivity}
                        addactivity={addactivity}
                        lenthtoarray={lenthtoarray}
                        activitycollapse={activitycollapse}
                        setactivitycollapse={setactivitycollapse}
                        images={images}
                        setimages={setimages}
                    />
                    <TourGuide
                        setaddguide={setaddguide}
                        addguide={addguide}
                        guidecollapse={guidecollapse}
                        setguidecollapse={setguidecollapse}
                        Guidedata={Guidedata}
                        setGuidedata={setGuidedata}
                    />
                    <Review
                        setaddreview={setaddreview}
                        addreview={addreview}
                        reviewcollapse={reviewcollapse}
                        setreviewcollapse={setreviewcollapse}
                        reviewdata={reviewdata}
                        setreviewdata={setreviewdata}
                    />
                </Layout>
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
                    onRemove={(e: any) => deleteincludeitem(e, setcustomizerefresh, customizerefresh)}
                    setlabel={setincludelabel}
                    setvalue={setincludevalue}
                    label={includelabel}
                    value={includevalue}
                    setinludeimg={setinludeimg}
                    indludeimg={indludeimg} />
            </Page >
        </>
    )
}

export default EditPackage;