import React from "react";
import Image from "next/image";
import Link from "next/link";

import CustomHead from "@/components/Head";
import { Properties } from 'csstype';
import meta from "../meta/meta.json"
import Head from "next/head";
interface ThankYouProps { }
const ThankYouITOutsource: React.FC<ThankYouProps> = () => {
    const hiddenStyle: Properties = {
        display: 'none',
        visibility: 'hidden',
    };    

const script1 = `{
        "@context":"https://schema.org",
        "@graph":[{"@type":"Organization",
        "@id":"https://www.alliancerecruitmentagency.ae/#organization",
        "name":"Alliance Recruitment Agency",
        "logo":{
            "@type":"ImageObject",
            "@id":"https://www.alliancerecruitmentagency.ae/#logo",
            "url":"https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
            "caption":"Alliance Recruitment Agency",
            "inLanguage":"en-US"
            }
        },
            {"@type":"WebSite",
                "@id":"https://www.alliancerecruitmentagency.ae/#website",
                "url":"https://www.alliancerecruitmentagency.ae/",
                "name":"Alliance Recruitment Agency","publisher":
    {"@id":"https://www.alliancerecruitmentagency.ae/#organization"}
    ,"inLanguage":"en-US"},
    {"@type":"ImageObject",
        "@id":"https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
        "url":"https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
        "width":"225","height":"60",
        "inLanguage":"en-US"}
    ,{"@type":"Person","@id":"https://www.alliancerecruitmentagency.ae/author/allianceadmin/","name":"Pallavi Chawla","image":
    
    {"@type":"ImageObject",
     "@id":"https://allianceae-10072.kxcdn.com/wp-content/uploads/2021/05/aut-avtar.jpg",
     "url":"https://allianceae-10072.kxcdn.com/wp-content/uploads/2021/05/aut-avtar.jpg",
     "caption":"Pallavi Chawla","inLanguage":"en-US"}
    ,"sameAs":["https://www.alliancerecruitmentagency.ae/"],
    "worksFor":{"@id":"https://www.alliancerecruitmentagency.ae/#organization"}
    },
    {"@type":"WebPage","@id":"https://www.alliancerecruitmentagency.ae/thank-you/#webpage",
     "url":"https://www.alliancerecruitmentagency.ae/thank-you/",
     "name":"Thank you - We have received your Enquiry",
     "datePublished":"2017-11-23 6:44",
     "dateModified":"2021-07-08 11:01",
     "author":
    {"@id":"https://www.alliancerecruitmentagency.ae/author/allianceadmin/"}
    ,"isPartOf":
    
    {"@id":"https://www.alliancerecruitmentagency.ae/#website"}
    ,"primaryImageOfPage":
    
    {"@id":"https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png"}
    ,"inLanguage":"en-US"},{"@type":"Article","headline":"Thank you - We have received your Enquiry","datePublished":"2017-11-23 6:44","dateModified":"2021-07-08 11:01","author":
    
    {"url":"https://www.alliancerecruitmentagency.ae/author/allianceadmin/","@type":"Person","name":"Pallavi Chawla"}
    ,"description":"Thank you for submitting your Enquiry, One of our representative will contact you within 24 hr.","name":"Thank you - We have received your Enquiry","@id":"https://www.alliancerecruitmentagency.ae/thank-you/#schema-2260","isPartOf":
    
    {"@id":"https://www.alliancerecruitmentagency.ae/thank-you/#webpage"}
    ,"publisher":
    
    {"@id":"https://www.alliancerecruitmentagency.ae/#organization"}
    ,"image":
    
    {"@id":"https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png"}
    ,"inLanguage":"en-US","mainEntityOfPage":{"@id":"https://www.alliancerecruitmentagency.ae/thank-you/#webpage"}}]}`
    const script2 = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alliance Recruitment Agency",
    "image": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
    "@id": "",
    "url": "https://www.alliancerecruitmentagency.ae/",
    "telephone": "+918980018741",
    "address": {
    "@type": "PostalAddress",
    "streetAddress": "B-707 MONDEAL SQUARE Sarkhej - Gandhinagar Hwy, Prahlad Nagar",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "postalCode": "380015",
    "addressCountry": "India"
    } ,
    "sameAs": [
    "https://www.facebook.com/Alliancerecruitmentagency/",
    "https://www.youtube.com/channel/UCTWg4i7ZXx1NTJ59SP8Nxrw",
    "https://www.linkedin.com/company/alliance-recruitment-agency/",
    "https://twitter.com/career_alliance"
    ]
    }`
    const script3 = `{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.alliancerecruitmentagency.ae/"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Thank you",
            "item": "https://www.alliancerecruitmentagency.ae/thank-you/"
          }]
        }`

    return (
        <div>
            <CustomHead
                {...meta["thank-you-it-outsource"]}
            />
            <>
                {/* <!-- Recruitment section start--> */}
                <section className="accounting-section " style={{ padding: "80px !important", marginTop: "20px" }}>
                    <div className="container">
                        <div className="inner-con">
                            <div className="row gy-4">
                                <div className="col-lg-12 d-flex justify-content-center flex-column align-items-center">
                                    <Image style={{ maxWidth: "110px", paddingBottom: "20px" }} width={10} height={10} src="assets/images/done-icon.svg" alt="Done" loading="lazy"
                                        className="img-fluid w-100 h-100 done-icon" />
                                    <h2 className="com-title">
                                        Thank you for providing the information!
                                    </h2>
                                    <div className="thank-you text-center">
                                        <p className="com-text     mx-3">
                                            Please review your email for the upcoming instructions.
                                        </p>

                                        <p className="com-text     mx-3 my-3">
                                            Rest assured we will ensure the security of your details. If you have any inquiries, dont hesitate to reach out to us at <Link href="mailto:sales@aistalent.com"> <strong>sales@aistalent.com</strong></Link>.
                                        </p>

                                        <p className="com-text     mx-3">
                                            Kindly verify your email for the subsequent instructions provided by Alex.
                                        </p>
                                    </div>
                                    <Link href="/" className="com-btn">
                                        Back To Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Recruitment section End--> */}


                     
<script type="application/ld+json" className="rank-math-schema" dangerouslySetInnerHTML={{ __html: script1 }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: script2 }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: script3 }} />
            </>
        </div>
    );
};
export default ThankYouITOutsource;

