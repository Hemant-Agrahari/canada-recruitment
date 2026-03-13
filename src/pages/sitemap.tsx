import { useEffect, useState } from "react";
import Link from "next/link";
import CustomHead from "@/components/Head";
import { Properties } from 'csstype';
import meta from "../meta/meta.json"
import Banner from "@/components/Banner";
import { locationLinks } from "@/components/Header/locationData";
import { headerData } from "@/components/Header/headerData";
interface SitemapPageProps { }
const SitemapPage: React.FC<SitemapPageProps> = () => {
    const hiddenStyle: Properties = {
        display: 'none',
        visibility: 'hidden',
    };

    const schema = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EmploymentAgency",
      "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency",
      "name": "Alliance Recruitment Agency Canada",
      "url": "https://www.alliancerecruitmentagency.ca",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.alliancerecruitmentagency.ca/#logo",
        "url": "https://www.alliancerecruitmentagency.ca/assets/images/header/alliance-new-logo.png",
        "caption": "Alliance Recruitment Agency Canada"
      },
      "telephone": "+17809004752",
      "email": "sales@alliancerecruitmentagency.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+17809004752",
          "contactType": "customer service",
          "email": "sales@alliancerecruitmentagency.com",
          "areaServed": "CA",
          "availableLanguage": ["en"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+918980018741",
          "contactType": "customer service",
          "email": "sales@alliancerecruitmentagency.com",
          "areaServed": "IN",
          "availableLanguage": ["en"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+19179009072",
          "contactType": "customer service",
          "email": "sales@alliancerecruitmentagency.com",
          "areaServed": "US",
          "availableLanguage": ["en"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+442038380743",
          "contactType": "customer service",
          "email": "sales@alliancerecruitmentagency.com",
          "areaServed": "GB",
          "availableLanguage": ["en"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2920 Highway 7, unit 2101",
        "addressLocality": "Vaughan",
        "addressRegion": "Ontario",
        "postalCode": "L4KOP4",
        "addressCountry": "CA"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/Alliancerecruitmentagency/",
        "https://youtube.com/channel/UCTWg4i7ZXx1NTJ59SP8Nxrw",
        "https://www.linkedin.com/company/alliance-recruitment-agency/",
        "https://twitter.com/career_alliance"
      ],
      "foundingDate": "2010",
      "description": "Top Canadian employment agency helping businesses hire skilled staff fast. Trusted staffing agency in Canada for IT, healthcare, engineering & more."
    },
    {
      "@type": "WebSite",
      "@id": "https://www.alliancerecruitmentagency.ca/#website",
      "url": "https://www.alliancerecruitmentagency.ca",
      "name": "Alliance Recruitment Agency Canada",
      "publisher": {
        "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency"
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.alliancerecruitmentagency.ca/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.alliancerecruitmentagency.ca/author/anish-malek/#author",
      "name": "Anish Malek",
      "url": "https://www.alliancerecruitmentagency.ca/author/anish-malek",
      "worksFor": {
        "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency"
      }
    }
  ]
}`
    interface BlogData {
        _id: string;
        bannerTitle: string;
        slug: string;

    }


    const [siteMap, setSiteMap] = useState<null | BlogData[]>(null);

    const fetchSiteMap = async (type: string) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/getSiteMap?type=${type}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();
            setSiteMap(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div>
            <CustomHead
                {...meta["sitemap"]}

            />
            <>
                <Banner
                    backgroundImage="/assets/images/banner.webp"
                    title="Sitemap"
                    alt="Banner: Sitemap"
                />
                <section className="mid-text-section contact-us-page">
                    <div className="container">
                        <div className="text-center">
                            <ul className="nav nav-pills mb-5 contact-us-links" id="pills-tab" role="tablist">
                                <li className="nav-item text-align-left" role="presentation">
                                    <button className="nav-link active text-align-left" id="Recruitment-Services-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                        aria-selected="true">Recruitment Services</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="Locations-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-Locations" type="button" role="tab" aria-controls="pills-profile"
                                        aria-selected="false">Locations</button>
                                </li>
                                {/* <!-- <li className="nav-item" role="presentation">
                        <button className="nav-link" id="Virtual-Assistants-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-Virtual-Assistants" type="button" role="tab"
                            aria-controls="pills-contact" aria-selected="false">Virtual Assistants</button>
                    </li> --> */}
                                {/* <!-- <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-Outsourcing-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-Outsourcing" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">IT Outsourcing</button>
                    </li> --> */}
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-Resources-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-Resources" type="button" role="tab" aria-controls="pills-contact"
                                        aria-selected="false">Resources</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-Blogs-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-Blogs" type="button" role="tab" aria-controls="pills-contact"
                                        aria-selected="false" onClick={() => fetchSiteMap("blog")} >Blogs</button>
                                </li>
                                {/* <!-- <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-Jobs-tab" data-bs-toggle="pill" data-bs-target="#pills-Jobs"
                            type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Jobs</button>
                    </li> --> */}

                            </ul>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                aria-labelledby="Recruitment-Services-tab">
                                <div className="container-fluid">
                                    <div className="text-wrapper row gx-lg-5">
                                        <div className="right-side col-lg-12 align-self-center">
                                            <div className="hire-a-candidate-form">
                                                <div className="row">
                                                    <div className="col-lg-12 p-0">
                                                        <h3 className="com-title text-align-left s-title mb-1">Recruitment Services</h3>
                                                        <ul className="custm-ul row">
                                                            {locationLinks.map((item) => (
                                                                <li key={item.key} className="col-6">
                                                                    <Link href={item.href}>
                                                                        {headerData.en[item.key as keyof typeof headerData.en]}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade " id="pills-Locations" role="tabpanel"
                                aria-labelledby="Locations-tab">
                                <div className="container-fluid">
                                    <div className="text-wrapper row gx-lg-5">
                                        <div className="right-side col-lg-12 align-self-center">
                                            <div className="hire-a-candidate-form">
                                                <div className="row">
                                                    <div className="col-lg-4 p-0">
                                                        <p> Locations</p>
                                                        <ul className="custm-ul">
                                                            <li> <Link
                                                                href="/guelph-staffing-agency/">
                                                                Guelph Staffing Agency </Link></li>
                                                            <li> <Link
                                                                href="/placement-agencies-winnipeg/">
                                                                Placement Agencies Winnipeg </Link></li>
                                                            <li> <Link
                                                                href="/staffing-agencies-calgary/">
                                                                Staffing Agencies Calgary </Link></li>
                                                            <li> <Link
                                                                href="/employment-agency-barrie/">
                                                                Employment Agency in Barrie</Link></li>
                                                            <li> <Link
                                                                href="/headhunters-recruitment-canada/">
                                                                Headhunters Recruitment Canada</Link></li>
                                                            <li> <Link
                                                                href="/manpower-employment-agency/">
                                                                Manpower Employment Agency</Link></li>
                                                            <li> <Link
                                                                href="/it-headhunters-toronto/">
                                                                IT Headhunters Toronto </Link></li>
                                                        </ul>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade " id="pills-Resources" role="tabpanel"
                                aria-labelledby="pills-Resources-tab">
                                <div className="container-fluid">
                                    <div className="text-wrapper row gx-lg-5">
                                        <div className="right-side col-lg-12 align-self-center">
                                            <div className="hire-a-candidate-form">
                                                <div className="row">
                                                    <p> Resources</p>
                                                    <div className="col-lg-6 p-0">
                                                        <ul className="custm-ul">
                                                            <li> <Link href="/privacy-policy">
                                                                Privacy Policy </Link></li>
                                                            <li> <Link
                                                                href="/notice/">
                                                                Notice </Link></li>
                                                            <li> <Link
                                                                href="/franchise-enquiry/">
                                                                Franchise Enquiry </Link></li>

                                                            <li> <Link href="/contact-us/">
                                                                Contact Us </Link></li>
                                                            <li> <Link href="/about-us/">
                                                                About Us </Link></li>




                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade " id="pills-Blogs" role="tabpanel"
                                aria-labelledby="pills-Blogs-tab">
                                <div className="container-fluid">
                                    <div className="text-wrapper row gx-lg-5">
                                        <div className="right-side col-lg-12 align-self-center">
                                            <div className="hire-a-candidate-form">
                                                <div className="row">
                                                    <div className="col-lg-12 p-0">
                                                        <p><Link href="/webblog/">Blogs</Link>
                                                        </p>


                                                        <ul className="custm-ul">
                                                            {siteMap && siteMap.length > 0 ? (
                                                                siteMap.map((item) => (
                                                                    <li key={item._id}>
                                                                        <Link href={`blog/${item.slug}`}>{item.bannerTitle || "Default Title"}</Link>
                                                                    </li>
                                                                ))

                                                            ) : (
                                                                <p className="text-white  w-100 " style={{ color: "#393185", textAlign: "center" }}>

                                                                    Loading...
                                                                </p>
                                                            )}


                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>





                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />


            </>
        </div>
    );
};
export default SitemapPage;

