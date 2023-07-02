import { Layout, Loading, Page } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AlertPop, Sessioncheker } from "../../../../../Global/Alert";
import CustomizeModal from "../Components/CustomizeModal";
import BasicDetail from "../Components/BasicDetail";
import Itinerariespage from "../Components/Itineraries";
import TourGuide from "../Components/TourGuide";
import Review from "../Components/Review";
import { Includestoarray, Itinerariestoarray, deleteincludeitem, lenthtoarray } from "../Components/Functions";

function AddPackage() {
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
    const [loading, setLoading] = useState<boolean>(false);
    const [collapse, setcollapse] = useState<any>();
    const [guidecollapse, setguidecollapse] = useState<any>();
    const [reviewcollapse, setreviewcollapse] = useState<any>();
    const [addguide, setaddguide] = useState<any>([0]);
    const [addreview, setaddreview] = useState<any>([0]);
    const [activitycollapse, setactivitycollapse] = useState<any>();
    const [package_data, setpackage_data] = useState<any>();
    const [producttypeview, setproducttypeview] = useState(false);
    const [customizerefresh, setcustomizerefresh] = useState(false);
    const [include_data, setinclude_data] = useState<any>([]);
    const [includemodal, setincludemodal] = useState(false);
    const [indludeimg, setinludeimg] = useState();
    const [images, setimages] = useState<any>([]);

    function Guide() {
        const ar: any = [];
        Object.keys(Guidedata).forEach(item => {
            ar.push({
                Guide_name: Guidedata?.[item]?.guide_name,
                Guide_designation: Guidedata?.[item]?.guide_designation,
                Guide_description: Guidedata?.[item]?.guide_description,
                Guide_social: Guidedata?.[item]?.guide_url,
                Guide_thumbnail: Guidedata?.[item]?.guide_image
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
            formdata.append('image', images?.[item]?.[i][0], `${Itineraries?.[index]?.[i]?.activitie_name}_${index}`);
        })
    })

    formdata.append('data',
        JSON.stringify({
            package_type: Packagetype,
            duration: Number(duration),
            title: Packagename,
            overview: Overview,
            description: description,
            packageimg: Packageimg,
            price: Number(Cost),
            discount_type: discounttype,
            discount_value: Number(discountvalue),
            Final_price: Number(finalprice),
            includes: Includestoarray(Includes, include_data),
            itineraries: Itinerariestoarray(Itineraries),
            Guide: Guide(),
            reviews: Reviewdata()
        })
    )

    const addpackage = () => {
        setLoading(true);
        const config = {
            method: "post",
            url: process.env.REACT_APP_SHOP_NAME + "/api/addpackage",
            withCredentials: true,
            data: formdata,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        if (Packagetype && Packagename && Cost && duration) {
            axios(config).then((res) => {
                Sessioncheker(res)
                if (res.data.message) {
                    AlertPop("Added", res.data.message, "success");
                }
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                AlertPop("Error", err.toString(), "error");
            })
        } else {
            AlertPop("Warning", "Kindly Fill required Fields", "warning");
            setLoading(false);
        }
    }

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
                image: indludeimg
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
                primaryAction={{
                    content: "save",
                    loading: loading,
                    onAction: () => addpackage()
                }}
                title="Add Package">
                <Layout >
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
                        Packageimg={Packageimg}
                        description={description}
                        setdescription={setdescription}
                        Overview={Overview}
                        setoverview={setoverview}
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

export default AddPackage;


