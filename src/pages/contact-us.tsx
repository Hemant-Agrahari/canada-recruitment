import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import PhoneInputComponent from "@/utils/phoneInput/phoneInput";
import CustomHead from "@/components/Head";
import { Properties } from 'csstype';
import meta from "../meta/meta.json"
import PostYourVacancy from "@/components/forms/postYourVacancy";
import StartProject from "@/components/forms/startProject";
import ForTraining from "@/components/forms/forTraining";
import { useRouter } from "next/router";
import Head from "next/head";

// Contact Us Page Schema
const contactUsPageSchema = {
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
            "@type": "WebPage",
            "@id": "https://www.alliancerecruitmentagency.ca/contact-us/#webpage",
            "url": "https://www.alliancerecruitmentagency.ca/contact-us",
            "name": "Contact Us | Talk to Our Recruitment Experts in Canada",
            "isPartOf": {
                "@id": "https://www.alliancerecruitmentagency.ca/#website"
            },
            "primaryImageOfPage": {
                "@type": "ImageObject", "url": "https://www.alliancerecruitmentagency.ca/assets/images/header/alliance-new-logo.png"
            },
            "inLanguage": "en-US",
            "datePublished": "2025-01-01T00:00:00+00:00",
            "dateModified": "2025-02-05T00:00:00+00:00",
            "author": {
                "@id": "https://www.alliancerecruitmentagency.ca/author/anish-malek/#author"
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
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.alliancerecruitmentagency.ca"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Contact Us",
                    "item": "https://www.alliancerecruitmentagency.ca/contact-us"
                }
            ]
        }
    ]
}



const ContactUs: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>('Hire');

    useEffect(() => {
        // Check if the URL contains "contact-us#Out"
        if (window.location.href.includes("contact-us#start-project")) {
            // Set the active tab and scroll to the content
            setActiveTab('start-project');
            const profileTab = document.getElementById('pills-profile');
            profileTab?.scrollIntoView({
                behavior: 'smooth',
                block: 'start', // Align the top of the target element at the top of the visible area
                inline: 'start', // Align the left side of the target element at the left side of the visible area
            });
        } else {
            // If no "contact-us#Out" in the URL, set the default active tab    
            setActiveTab('Hire');
        }
    }, [router.asPath]); // Re-run the effect when the route changes

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        router.push(`/contact-us#${tab}`);
    };

    const hiddenStyle: Properties = {
        display: 'none',
        visibility: 'hidden',
    };

    return (
        <>
            <CustomHead
                {...meta["contact-us"]}
            />
            <>
                <Banner
                    backgroundImage="/assets/images/location-banner.webp"
                    title="Contact Us"
                    alt="Alliance: Get in touch with our team for partnership inquiries and collaborations."
                />
                <section className="mid-text-section contact-us-page contact-us-custom">
                    <div className="container">
                        <div className="text-center">
                            <ul className="nav nav-pills  mb-5 contact-us-links" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link check-tab ${activeTab === 'Hire' ? 'active' : ''}`}
                                        id="pills-home-tab"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-home"
                                        aria-selected={activeTab === 'Hire'}
                                        onClick={() => handleTabClick('Hire')}>Hire A Candidate</button>
                                </li>
                                <li className="nav-item">
                                    <Link href="https://www.alliancerecruitmentagency.com/job-seekers/" className="nav-link check-tab">
                                        Apply For A Job
                                    </Link>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link check-tab ${activeTab === 'start-project' ? 'active' : ''}`}
                                        id="pills-profile-tab"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-profile"
                                        aria-selected={activeTab === 'start-project'}
                                        onClick={() => handleTabClick('start-project')}>Start A Project</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link check-tab ${activeTab === 'Training' ? 'active' : ''}`}
                                        id="pills-contact-tab"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected={activeTab === 'Training'}
                                        onClick={() => handleTabClick('Training')}>For Training</button>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="pills-tabContent-12">
                            <div
                                className={`tab-pane fade ${activeTab === 'Hire' ? 'show active' : ''}`}
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                                style={activeTab !== 'Hire' ? hiddenStyle : {}}
                            >
                                <div className="container-fluid">
                                    <div className="text-wrapper row gx-lg-5">
                                        <div className="right-side col-lg-12 align-self-center">
                                            <div className="hire-a-candidate-form">
                                                <div className="hire-cad-bg">
                                                    <Image src="/assets/images/form-bg.svg" width={1092} height={696} alt="cadidate image" title="cadidate image"
                                                        loading="lazy" className="w-100 h-100" />
                                                </div>
                                                <h3 className="com-title text-center s-title mb-1">Post Your Vacancy </h3>
                                                <p className="com-text mb-4 text-center"><b>We provide top talents to Employers, Best
                                                    Career opportunities to candidates  Hire our highly qualified talents.</b></p>
                                                <PostYourVacancy />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`tab-pane fade ${activeTab === 'start-project' ? 'show active' : ''}`}
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                                style={activeTab !== 'start-project' ? hiddenStyle : {}}
                            >
                                <div className="container-fluid">
                                    <div className="text-wrapper row gx-lg-5">
                                        <div className="right-side col-lg-12 align-self-center">
                                            <div className="hire-a-candidate-form">
                                                <div className="hire-cad-bg">
                                                    <Image src="/assets/images/form-bg.svg" width={820} height={413} alt="cadidate image" title="cadidate image"
                                                        loading="lazy" className="w-100 h-100" />
                                                </div>
                                                <h3 className="com-title text-center s-title mb-1">Start A Project</h3>
                                                <p className="com-text mb-4 text-center">Engage with us for your project or campaign
                                                    requirements. Please share all the details, and we'll reach out to you with the next
                                                    steps.</p>
                                                <StartProject />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`tab-pane fade ${activeTab === 'Training' ? 'show active' : ''}`}
                                id="pills-contact"
                                role="tabpanel"
                                aria-labelledby="pills-contact-tab"
                                style={activeTab !== 'Training' ? hiddenStyle : {}}
                            >
                                <div className="container-fluid">
                                    <div className="text-wrapper row gx-lg-5">
                                        <div className="right-side col-lg-12 align-self-center">
                                            <div className="hire-a-candidate-form">
                                                <div className="hire-cad-bg">
                                                    <Image src="/assets/images/form-bg.svg" width={820} height={413} alt="cadidate image" title="cadidate image"
                                                        loading="lazy" className="w-100 h-100" />
                                                </div>
                                                <h3 className="com-title text-center s-title mb-1">For Training</h3>
                                                <p className="com-text mb-4 text-center">For Training - Fill The Details and We Will
                                                    Call You for Further Guidance</p>
                                                <ForTraining />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* {apiResponse  (
                    <div>
                        <h2>API Response:</h2>
                        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                    </div>
                )} */}
                {/* <!-- Hire talent start --> */}
                <section className="hire-talent pt-0">
                    <h3 className="com-title text-center s-title mb-1">Our Branches in UAE, USA, Europe, Australia, Africa  India</h3>
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/dubai.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/dubai.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/dubai.webp" src="/assets/images/contact-us-images/dubai.webp" loading="lazy" alt=" Alliance Global Presence with Branches in Dubai
                                        " title=" Alliance Global Presence with Branches in Dubai
                                        " className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">DUBAI</h3>
                                    <p className="com-text">
                                        Silicon Oasis, Dubai, UAE
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/houston.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/houston.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/houston.webp" src="/assets/images/contact-us-images/houston.webp" loading="lazy" alt="Alliance Global Presence: Houston Branch - Contact Us for International Services" title="Alliance Global Presence: Houston Branch - Contact Us for International Services" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">HOUSTON</h3>
                                    <p className="com-text">
                                        77429, Texas, USA
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/poland.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/poland.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/poland.webp" src="/assets/images/contact-us-images/poland.webp" loading="lazy" alt="Alliance's International Reach: Branches Across the Globe, Including Poland" title="Alliance's International Reach: Branches Across the Globe, Including Poland" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">POLAND</h3>
                                    <p className="com-text">
                                        Opole, Poland
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/australia.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/australia.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/australia.webp" src="/assets/images/contact-us-images/australia.webp" loading="lazy" alt="Alliance Worldwide Network: Expanding Reach with Branches in Australia" title="Alliance Worldwide Network: Expanding Reach with Branches in Australia" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">AUSTRALIA</h3>
                                    <p className="com-text">
                                        Sydney, Australia
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/mauritius.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/mauritius.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/mauritius.webp" src="/assets/images/contact-us-images/mauritius.webp" loading="lazy" alt="Alliance Branch in Mauritius" title="Alliance Branch in Mauritius" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">MAURITIUS</h3>
                                    <p className="com-text">
                                        City of Phoenix, Republic of Mauritius
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/africa.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/africa.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/africa.webp" src="/assets/images/contact-us-images/africa.webp" loading="lazy" alt="Alliance Africa Branch Location
" title="Alliance Africa Branch Location
" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">AFRICA</h3>
                                    <p className="com-text">
                                        Angola, Africa
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/pune-img.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/pune-img.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/pune-img.webp" src="/assets/images/contact-us-images/pune-img.webp" loading="lazy" alt="Alliance Global Reach: Pune Branch - Extending Our Presence in India and Beyond" title="Alliance Global Reach: Pune Branch - Extending Our Presence in India and Beyond" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">PUNE</h3>
                                    <p className="com-text">
                                        Chikhali, Pune - 412114
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/vadodara-img.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/vadodara-img.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/vadodara-img.webp" src="/assets/images/contact-us-images/vadodara-img.webp" loading="lazy" alt="Alliance's Vadodara Branch - Part of Our Global Presence" title="Alliance's Vadodara Branch - Part of Our Global Presence" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">VADODARA</h3>
                                    <p className="com-text">
                                        Karelibaug, Vadodara - 390018, Gujarat
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/haridwar-img.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/haridwar-img.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/haridwar-img.webp" src="/assets/images/contact-us-images/haridwar-img.webp" loading="lazy" alt="Alliance Global Presence - Branches in Haridwar, India" title="Alliance Global Presence - Branches in Haridwar, India" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">HARIDWAR</h3>
                                    <p className="com-text">
                                        Jamuna Lane Haridwar - 249401
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/kolkata.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/kolkata.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/kolkata.webp" src="/assets/images/contact-us-images/kolkata.webp" loading="lazy" alt="Alliance Global Presence: Branches in Kolkata and Worldwide" title="Alliance Global Presence: Branches in Kolkata and Worldwide" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">KOLKATA</h3>
                                    <p className="com-text">
                                        Howrah, Kolkata, West Bengal - 711104
                                        <br />
                                        Webel IT park, Kolkata - 741235
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/hyderabad.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/hyderabad.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/hyderabad.webp" src="/assets/images/contact-us-images/hyderabad.webp" loading="lazy" alt="Alliance Global Presence: Hyderabad Branch – Connecting Worlds, Creating Solutions" className="img-fluid w-100 h-100" title="Alliance Global Presence: Hyderabad Branch – Connecting Worlds, Creating Solutions

" />
                                    </picture>
                                    <h3 className="hire-title mb-1">HYDERABAD</h3>
                                    <p className="com-text">
                                        502032, Telangana
                                        <br />
                                        500082, Telangana
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/delhi.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/delhi.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/delhi.webp" src="/assets/images/contact-us-images/delhi.webp" loading="lazy" alt="Contact Alliance: Delhi Office - Reach Us for Collaborative Solutions" title="Contact Alliance: Delhi Office - Reach Us for Collaborative Solutions" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">DELHI</h3>
                                    <p className="com-text">
                                        110001, Delhi/NCR
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/chandigarh.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/chandigarh.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/chandigarh.webp" src="/assets/images/contact-us-images/chandigarh.webp" loading="lazy" alt="Alliance Contact Us - Chandigarh Branch Location" title="Alliance Contact Us - Chandigarh Branch Location" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">CHANDIGARH</h3>
                                    <p className="com-text">
                                        160047, Chandigarh
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/tamil-nadu.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/tamil-nadu.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/tamil-nadu.webp" src="/assets/images/contact-us-images/tamil-nadu.webp" loading="lazy" alt="Contact Us - Alliance Chennai Office: Seamless Solutions and Support" title="Contact Us - Alliance Chennai Office: Seamless Solutions and Support" className=" img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">CHENNAI</h3>
                                    <p className="com-text">
                                        Tamil Nadu, 600130 <br />
                                        Chennai, 600062
                                    </p>

                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/rourkela-odisha.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/rourkela-odisha.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/rourkela-odisha.webp" src="/assets/images/contact-us-images/rourkela-odisha.webp" loading="lazy" alt="Alliance Contact Us - Rourkela, Odisha Branch: Navigating Excellence in Services and Solutions" title="Alliance Contact Us - Rourkela, Odisha Branch: Navigating Excellence in Services and Solutions" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">ODISHA</h3>
                                    <p className="com-text">
                                        Rourkela, Odisha - 769015
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/maharastra.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/maharastra.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/maharastra.webp" src="/assets/images/contact-us-images/maharastra.webp" loading="lazy" alt="Contact Alliance in Maharashtra - Reach Out for Expert Solutions and Services
"  title="Contact Alliance in Maharashtra - Reach Out for Expert Solutions and Services
" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">MAHARASHTRA</h3>
                                    <p className="com-text">
                                        Kalyan - 421301, Thane
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 hire-card-col">
                                <div className="hire-card">
                                    <picture>
                                        <source srcSet="/assets/images/contact-us-images/agra.webp" type="image/webp" />
                                        <source srcSet="/assets/images/contact-us-images/agra.png" type="image/png" />
                                        <Image width={200} height={200} data-src="/assets/images/contact-us-images/agra.webp" src="/assets/images/contact-us-images/agra.webp" loading="lazy" alt="Alliance Contact Us - Agra Branch Location Image" title="Alliance Contact Us - Agra Branch Location Image" className="img-fluid w-100 h-100" />
                                    </picture>
                                    <h3 className="hire-title mb-1">AGRA</h3>
                                    <p className="com-text">
                                        Agra, 282007
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Hire talent End --> */}

                {/* Contact Us Page Schema */}
                <Head>
                    <script
                        id="contact-us-page-schema"
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactUsPageSchema) }}
                    />
                </Head>
            </>
        </>
    );
};
export default ContactUs;

