import Image from "next/image";
import Link from "next/link";
import { CiBank } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { CiMobile3 } from "react-icons/ci";

// import CustomHead from "@/components/Head";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton, // Import WhatsappShareButton
} from "react-share";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'; // Import necessary icons
import ErrorLoading from "@/pages/404";

// Helper functions
const escapeHtml = (html: any) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

const formatDate = (dateString: any) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const escapeJson = (jsonString: any) => {
  if (!jsonString) return '';
  return jsonString.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
};

const sanitizeH1 = (html: string) => {
  if (!html) return '';
  return html.replace(/<h1/gi, '<h2').replace(/<\/h1>/gi, '</h2>');
};

// Function to generate comprehensive Job Posting schema
const generateJobPostingSchema = (jobData: any) => {
  const baseUrl = "https://www.alliancerecruitmentagency.ca";
  const jobUrl = `${baseUrl}/job/${jobData?.job_id}/${jobData?.location_of_posting?.toLowerCase().replace(/[\s/]+/g, '-')}/${jobData?.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "datePosted": formatDate(jobData?.publish_date || jobData?.createdAt),
    "description": escapeHtml(jobData?.rms_description || jobData?.requirement || jobData?.roles_responsibility),
    "employmentType": "FULL_TIME",
    "educationRequirements": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": jobData?.qualifications || "Bachelor degree"
    },
    "experienceRequirements": {
      "@type": "OccupationalExperienceRequirements",
      "monthsOfExperience": jobData?.min_experience ? (parseInt(jobData.min_experience) * 12).toString() : "0"
    },
    "incentiveCompensation": "",
    "industry": jobData?.industry?.name || null,
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": jobData?.location_of_posting || "",
        "addressRegion": jobData?.location_of_posting || "",
        "postalCode": "",
        "streetAddress": "",
        "addressCountry": jobData?.country || "Canada"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": (typeof jobData?.currency === 'object' ? jobData?.currency?.short_code : jobData?.currency) || "CAD",
      "value": {
        "@type": "QuantitativeValue",
        "value": jobData?.min_salary || "0",
        "unitText": "MONTH"
      }
    },
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Alliance Recruitment Agency Canada",
      "sameAs": `${baseUrl}/`,
      "logo": `${baseUrl}/assets/images/header/alliance-new-logo.png`
    },
    "occupationalCategory": jobData?.rms_occupational_category || null,
    "qualifications": jobData?.qualifications || "",
    "responsibilities": escapeHtml(jobData?.roles_responsibility),
    "specialCommitments": "VeteranCommit",
    "title": jobData?.job_title || "",
    "disambiguatingDescription": `Apply for ${jobData?.job_title} Job at ${jobData?.location_of_posting}. Qualification: ${jobData?.qualifications}, Experience: ${jobData?.min_experience} - ${jobData?.max_experience} years.`,
    "workHours": "Full time",
    "validThrough": formatDate(jobData?.last_apply_date),
    "url": jobUrl
  };
};

// Function to generate comprehensive organization schema
const generateOrganizationSchema = (jobData: any) => {
  const baseUrl = "https://www.alliancerecruitmentagency.ca";
  const jobUrl = `${baseUrl}/job/${jobData?.job_id}/${jobData?.location_of_posting?.toLowerCase().replace(/[\s/]+/g, '-')}/${jobData?.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmploymentAgency",
        "@id": `${baseUrl}/#employmentagency`,
        "name": "Alliance Recruitment Agency Canada",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          "url": `${baseUrl}/assets/images/header/alliance-new-logo.png`,
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
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Alliance Recruitment Agency Canada",
        "publisher": {
          "@id": `${baseUrl}/#employmentagency`
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${jobUrl}/#webpage`,
        "url": jobUrl,
        "name": `${jobData?.job_title} Job at ${jobData?.location_of_posting} - Alliance Recruitment Agency CA`,
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${baseUrl}/_next/image?url=%2Fassets%2Fimages%2Fheader%2Falliance-new-logo.png&w=256&q=75`
        },
        "inLanguage": "en-US",
        "datePublished": formatDate(jobData?.publish_date || jobData?.createdAt),
        "dateModified": formatDate(jobData?.updatedAt),
        "author": {
          "@id": `${baseUrl}/author/anish-malek/#author`
        }
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/author/anish-malek/#author`,
        "name": "Anish Malek",
        "url": `${baseUrl}/author/anish-malek`,
        "worksFor": {
          "@id": `${baseUrl}/#employmentagency`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Jobs",
            "item": `${baseUrl}/job-seekers`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": jobData?.job_title || "",
            "item": jobUrl
          }
        ]
      }
    ]
  };
};

const index = ({ data }: { data: any }) => {
  const [jobDetails, setJobDetails] = useState<any>(data || []);
  const [newdata, setNewData] = useState<string | null>(null);

  // useEffect(() => {
  //   const getContentFromMainTitle = () => {
  //     const mainTitle = document.querySelector(".breadcrumb_last");
  //     if (mainTitle) {
  //       const content = mainTitle.textContent;
  //       console.log("newcontent", content);
  //       setNewData(content ? content + "\n" : null);
  //     }
  //   };

  //   getContentFromMainTitle();
  // }, []);

  if (!data) {
    return <ErrorLoading />
  }

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  // Generate schemas
  const jobPostingSchema = generateJobPostingSchema(jobDetails?.data);
  const organizationSchema = generateOrganizationSchema(jobDetails?.data);

  const formattedDate = jobDetails?.data?.publish_date ? jobDetails?.data?.publish_date.split('T')[0] : '';
  const formattedEndDate = jobDetails?.data?.last_apply_date ? jobDetails?.data?.last_apply_date.split('T')[0] : '';
  const updatedAt = jobDetails?.data?.updatedAt ? jobDetails?.data?.updatedAt.split('T')[0] : '';

  const url = `https://www.alliancerecruitmentagency.ca/job/${jobDetails?.data?.job_id}/${jobDetails?.data?.location_of_posting?.toLowerCase().replace(/[\s/]+/g, '-')}/${jobDetails?.data?.slug}`;

  // Prepare meta tag content
  const ogImage = "https://www.alliancerecruitmentagency.ca/assets/images/common-img/facebook-banner-og-image.webp";
  const jobTitle = jobDetails?.data?.job_title || "";
  const location = jobDetails?.data?.location_of_posting || "";
  const qualifications = jobDetails?.data?.qualifications || "Bachelor degree";
  const experience = jobDetails?.data?.min_experience || "1";

  // Format experience text - singular "year" for 1, plural "years" for others
  const experienceText = experience === "1" || experience === 1 ? "1 year" : `${experience} years`;

  // OG Description format: "Apply for the {Job Title} job at {Location}. Qualification required: {Qualifications}, Experience: {Experience}."
  const ogDescription = `Apply for the ${jobTitle} job at ${location}. Qualification required: ${qualifications}, Experience: ${experienceText}.`;

  // Twitter Description format: "Apply for the {Job Title} job in {Location}. Qualification: {Qualifications}, Experience: {Experience}."
  const twitterDescription = `Apply for the ${jobTitle} job in ${location}. Qualification: ${qualifications}, Experience: ${experienceText}.`;

  // Twitter Title format: "{Job Title} Job in {Location}"
  const twitterTitle = `${jobTitle} Job in ${location}`;

  return (
    <>
      <Head>
        <meta name="title" content={`${jobTitle} Job at ${location}`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="description" content={`Apply for ${jobTitle} Job at ${location} . Qualification: ${qualifications} , Experience: ${experience} -  years.`} />
        <title>{`${jobTitle} Job at ${location} - Alliance Recruitment Agency CA`}</title>
        <link rel="canonical" href={url} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={jobTitle} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Alliance Recruitment Agency Canada" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="job-details-wrapper mt-0">
        <section className=" job-box-description py-50">
          <div className="container heading">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="text-dark mb-3 job-title">{jobDetails?.data?.job_title}</h1>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-lg-8 col-md-7">
                <div className="job-detail border rounded p-md-4 p-3">
                  <div className="job-detail-content">
                    <div className="company-logo">
                      <Image
                        width={150}
                        height={150}
                        src="/assets/images/header/alliance-new-logo.png"
                        alt="alliancerecruitmentagency"
                        title="alliancerecruitmentagency"
                        className="img-fluid"
                      />
                    </div>

                    <div className="job-title-section">
                      <h2 className="job-title"> {jobDetails?.data?.job_title}</h2>
                      <p className="text-muted mb-0">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 640 512"
                          className="me-2"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path>
                        </svg>
                        {jobDetails?.data?.company_id}
                      </p>
                      <p className="text-muted mb-0">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="me-2"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {jobDetails?.data?.location_of_posting}
                      </p>
                      <p className="text-muted mb-0 d-flex align-items-center  mb-4   ">
                        <span style={{ marginRight: "5px" }}>Job Views: </span>
                        <span style={{ marginRight: "5px" }}>{jobDetails?.data?.job_views}</span>{" "}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 512 512"
                          className="me-2 ml-2"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="32"
                            d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z"
                          ></path>
                          <circle
                            cx="256"
                            cy="256"
                            r="80"
                            fill="none"
                            stroke-miterlimit="10"
                            stroke-width="32"
                          ></circle>
                        </svg>
                      </p>
                    </div>
                  </div>
                  {jobDetails?.data?.additional_requirement && <div className="job-detail-desc mt-md-4 mt-3">
                    <p>
                      <b>Skills</b>:
                    </p>
                    <div className="col-lg-12">
                      <div className="job-detail border rounded mt-2 p-3">
                        <div className="job-detail-desc">
                          <div className="job-details-desc-item" dangerouslySetInnerHTML={{ __html: sanitizeH1(jobDetails?.data?.additional_requirement) }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}


                  <div className="opening-details">
                    <p><span><strong>Created Date: </strong></span><span>{formattedDate}</span></p>
                    <p><span><strong>End Date: </strong></span><span>{formattedEndDate}</span></p>
                    {jobDetails?.data?.min_experience && <p><span><strong>Experience: </strong></span><span> {jobDetails?.data?.min_experience} - {jobDetails?.data?.max_experience} years </span></p>}
                    <p><span><strong>Salary: </strong></span><span> {jobDetails?.data?.min_salary}</span></p>
                    <p><span><strong>Industry: </strong></span><span> {jobDetails?.data?.industry.name}</span></p>
                    <p><span><strong>Openings: </strong></span><span> {jobDetails?.data?.number_of_opening}</span></p>
                  </div>
                </div>


                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="text-dark mt-4 mb-0">Primary Responsibilities :</h5>
                  </div>
                  <div className="col-lg-12">
                    <div className="job-detail border rounded mt-2 p-3">
                      <div className="job-detail-desc">
                        <div className="" dangerouslySetInnerHTML={{ __html: sanitizeH1(jobDetails?.data?.roles_responsibility) }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {jobDetails?.data?.additional_requirement &&
                  <div className="row">
                    <div className="col-lg-12">
                      <h5 className="text-dark mt-4 mb-0">Desired Skills:</h5>
                    </div>
                    <div className="col-lg-12">
                      <div className="job-detail border rounded mt-2 p-3">
                        <div className="job-detail-desc">
                          <div className="job-details-desc-item" dangerouslySetInnerHTML={{ __html: sanitizeH1(jobDetails?.data?.additional_requirement) }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <div className="row g-3">
                  <div className="col-lg-12">
                    <h5 className="text-dark mt-4 mb-0">Experience Requirements:</h5>
                  </div>
                  <div className="col-lg-12">
                    <div className="job-detail border rounded mt-2 p-3">
                      <div className="job-detail-desc">
                        <div className="job-details-desc-item" dangerouslySetInnerHTML={{ __html: sanitizeH1(jobDetails?.data?.requirement) }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-5 ">
                <div className="job-detail border rounded p-md-4 p-3 rightsec">
                  <h5 className="text-muted text-center pb-2">
                    <i className="mdi mdi-map-marker me-2"></i>Location
                  </h5>
                  <div className="job-detail-location pt-4 border-top">
                    <div className="job-details-desc-item flex-row">
                      <div className="float-start me-2">

                        < CiBank />
                      </div>
                      <p className="text-muted mb-2 ml-2" >
                        : Alliance Recruitment Agency
                      </p>
                    </div>
                    <div className="job-details-desc-item flex-row">
                      <div className="float-start me-2">

                        < CiGlobe />
                      </div>
                      <p className="text-muted mb-2 ml-2" >
                        :
                        <Link className="ml-2 font-small" href="https://www.alliancerecruitmentagency.ca">
                          www.alliancerecruitmentagency.ca
                        </Link>
                      </p>
                    </div>
                    <div className="job-details-desc-item flex-row" style={{ display: "flex" }}>
                      <div className="float-start me-2">

                        < CiMobile3 />
                      </div>

                      <div className="text-muted">: </div>

                      <p className="text-muted mb-2 ml-2" >
                        <Link className="ml-2" href="tel:+918980018741"> +91 8980018741</Link>
                      </p>
                    </div>

                    {/* <div className="job-details-desc-item" style={{ display: "flex" }}>
                      <div className="float-start me-2">

                        <BiDollar />
                      </div>

                      <div className="text-muted">: </div>

                      <p className="text-muted mb-2 ml-2" >
                        <Link className="ml-2" href="">$700 - $800/month</Link>
                      </p>
                    </div>
                    <div className="job-details-desc-item" style={{ display: "flex" }}>
                      <div className="float-start me-2">

                        <MdOutlineSecurity />
                      </div>

                      <div className="text-muted">: </div>

                      <p className="text-muted mb-2 ml-2" >
                        <Link className="ml-2" href="">{jobDetails[0]?.experience} 1 To 3 Years.</Link>
                      </p>
                    </div>
                    <div className="job-details-desc-item" style={{ display: "flex" }}>
                      <div className="float-start me-2">

                        <IoMdTime />
                      </div>

                      <div className="text-muted">: </div>

                      <p className="text-muted mb-2 ml-2" >
                        <Link className="ml-2" href=""> {jobDetails[0]?.publish_date}</Link>
                      </p>
                    </div> */}

                    <h6 className="text-dark f-17 mt-3 mb-0">Share Job :</h6>

                    <ul className="social-icon list-inline mt-3 mb-0">
                      <li className="list-inline-item">
                        <FacebookShareButton url={url} title={newdata !== null ? newdata : undefined}>
                          <a href="#" className="rounded">
                            <FaFacebookF size={20} />
                          </a>
                        </FacebookShareButton>
                      </li>
                      <li className="list-inline-item">
                        <TwitterShareButton url={url} title={newdata !== null ? newdata : undefined}>
                          <a href="#" className="rounded">
                            <FaTwitter size={20} />
                          </a>
                        </TwitterShareButton>
                      </li>
                      {/* <li className="list-inline-item">
                        <WhatsappShareButton url={url} title={newdata !== null ? newdata : undefined}>
                          <a href="#" className="rounded">
                            <FaWhatsapp size={20} />
                          </a>
                        </WhatsappShareButton>
                      </li> */}
                      <li className="list-inline-item">
                        <LinkedinShareButton url={url} title={newdata !== null ? newdata : undefined}>
                          <a href="#" className="rounded">
                            <FaLinkedinIn size={20} />
                          </a>
                        </LinkedinShareButton>
                      </li>
                    </ul>

                    <div className="mt-4">
                      <Link
                        href={`https://ats.allianceinternational.co.in/job-Seeker-Apply/${jobDetails?.data?.job_id}/${jobDetails?.data?.location_of_posting?.toLowerCase().replace(/[\s/]+/g, '-')}/${jobDetails?.data?.slug}`}
                        className="btn btn-block btn-primary"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <div className="job-detail border rounded p-md-4 p-3 rightsec mt-4">
                  <h5 className="text-muted text-center pb-2">
                    <i className="fa fa-time"></i> Opening Hours

                  </h5>
                  <div className=" pt-4 border-top opening-hrs">
                    <span className="day">Monday</span><span className="time">9AM - 7PM
                    </span>
                  </div>
                  <div className=" pt-4 border-top opening-hrs">
                    <span className="day">Tuesday</span><span className="time">9AM - 7PM
                    </span>
                  </div>
                  <div className=" pt-4 border-top opening-hrs">
                    <span className="day">Wednesday</span><span className="time">9AM - 7PM
                    </span>
                  </div>
                  <div className=" pt-4 border-top opening-hrs">
                    <span className="day">Thursday</span><span className="time">9AM - 7PM</span>
                  </div>
                  <div className=" pt-4 border-top opening-hrs">
                    <span className="day">Friday</span><span className="time">9AM - 7PM</span>
                  </div>
                  <div className=" pt-4 border-top opening-hrs">
                    <span className="day">Saturday</span><span className="time">6:30AM - 1PM</span>
                  </div>
                  <div className=" pt-4 border-top opening-hrs">
                    <span className="day">Sunday</span><span className="time">Closed</span>
                  </div>
                </div> */}

              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Structured Data Schemas */}
      {jobDetails?.data?.job_title && (
        <Head>
          <script
            id="job-posting-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
          />
          <script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
        </Head>
      )}
    </>
  );
};
export default index;
// export async function getServerSideProps({ params }: any) {
//   const { slug } = params;
//   try {
//     const response = await axios.post('https://ats.alliancerecruitmentagency.com/api/jobdetailsByCompanyAndSlug', {
//       company_id: 21,
//       slug: slug
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const data = response.data.data; // Extract only the data you need
//     console.log("Company-wise Jobs: ", data);
//     return { props: { data } };
//   } catch (error) {
//     console.error("Error fetching job details:", error);
//     return { props: { data: null, error: 'Failed to fetch job details' } };
//   }
// }
// export async function getServerSideProps({ params }: { params: { slug: string } }) {
//   const { slug } = params;

//   console.log("slug", slug);
//   try {
//     const baseURL = "https://allianceaeapi.alliancerecruitmentagency.ae/";
//     const url = `${baseURL}getOneJob/${slug}`;
//     const response = await axios.get(url, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const data = response.data.data; // Extract only the data you need
//     console.log("Company-wise Jobs33333: ", data);
//     return { props: { data } };
//   } catch (error) {
//     console.error("Error fetching job details:", error);
//     return { props: { data: null, error: 'Failed to fetch job details' } };
//   }
// }


export const getServerSideProps = async (context: any) => {
  const { id, location, slug } = context.query;

  if (!id) {
    return {
      props: {
        jobDetails: null,
        error: 'Missing required parameters',
      },
    };
  }

  try {
    const encodedLocation = encodeURIComponent(location as string);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getJobDetailsById/${id}`
    );

    // console.log("Response Data: ", response.data);

    const data = response.data; // Extract only the data you need

    return {
      props: { data: data },
    };
  } catch (err) {
    console.error("Error fetching job details: ", err);
    return {
      props: {
        jobDetails: null,
        error: 'Failed to fetch job details',
      },
    };
  }
};

